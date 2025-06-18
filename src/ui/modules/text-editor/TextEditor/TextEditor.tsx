import { useEffect, useRef, useState } from 'react';
import classNameModule from '../../../core/classname';
import styles from './TextEditor.module.scss';
import { getAbsoluteTextSelection, setAbsoluteTextSelection } from './selection.utils';
import { $backspaceText, $deleteText, $insertText, $wrapText } from './modification.utils';
import { TextSelection } from './TextEditor.types';
import { markdownToHTML } from './render.utils';
import { useCommand } from '@ui/hooks/useCommand';
import { Button } from '@ui/primitives';
import { BoldIcon, ItalicIcon, LinkIcon } from 'lucide-react';
const className = classNameModule(styles)

type TextEditorProps = {
    value: string
    onValueChange: (value: string) => void
}

export const TextEditor = ({ value, onValueChange }: TextEditorProps) => {
    const rootRef = useRef<HTMLDivElement>(null)
    const valueRef = useRef(value)

    const historyRef = useRef<{ markdown: string, selection: TextSelection }[]>([{ markdown: value, selection: { start: 0, end: 0 } }])
    const forwardHistoryRef = useRef<{ markdown: string, selection: TextSelection }[]>([])

    const [currentSelection, setCurrentSelection] = useState<TextSelection>({ start: 0, end: 0 })

    useCommand('undo', () => {
        if (historyRef.current.length > 1) {
            const currentState = historyRef.current.pop()!
            forwardHistoryRef.current.push(currentState)

            const previousState = historyRef.current[historyRef.current.length - 1]
            valueRef.current = previousState.markdown

            formatContent()
            onValueChange(valueRef.current)

            // Restaurer la position du curseur
            const root = rootRef.current
            if (root) {
                setAbsoluteTextSelection(root, previousState.selection.start, previousState.selection.end)
            }
        }
    }, {
        preventDefault: true
    })

    useCommand('redo', () => {
        if (forwardHistoryRef.current.length > 0) {
            const nextState = forwardHistoryRef.current.pop()!
            historyRef.current.push(nextState)

            valueRef.current = nextState.markdown

            formatContent()
            onValueChange(valueRef.current)

            // Restaurer la position du curseur
            const root = rootRef.current
            if (root) {
                setAbsoluteTextSelection(root, nextState.selection.start, nextState.selection.end)
            }
        }
    }, {
        preventDefault: true
    })

    useEffect(() => {
        init()
    }, [])

    return <div {...className('TextEditorContainer')}>

        <header style={{ marginBottom: 5 }}>

            <Button onPointerDown={(e) => {
                e.preventDefault()
                boldSelection()
            }} variant='outline' size="sm">
                <BoldIcon size={14} />
            </Button>

            <Button onPointerDown={(e) => {
                e.preventDefault()
                italicSelection()
            }} variant='outline' size="sm">
                <ItalicIcon size={14} />
            </Button>

            <Button onPointerDown={(e) => {
                e.preventDefault()
                link()
            }} variant='outline' size="sm">
                <LinkIcon size={14} />
            </Button>
        </header>
        <div {...className('count')}>
            <div>{currentSelection.start}</div>
            <div>
                {currentSelection.end}

            </div>
        </div>
        <div {...className('TextEditor')}
            ref={rootRef}
            spellCheck={false}
            contentEditable
            onPaste={e => {
                e.preventDefault()
                const root = rootRef.current
                if (!root) return

                const domSelection = getAbsoluteTextSelection(root)
                if (!domSelection) return
                const selection = transposeSelection(domSelection)

                const text = e.clipboardData.getData('text/plain')

                if (isURL(text)) {
                    let linkText
                    let newText

                    if (selection.start === selection.end) {
                        linkText = text
                        newText = `[${linkText}](${text})`
                    } else {
                        const selectedText = valueRef.current.slice(selection.start, selection.end)
                        linkText = selectedText
                        newText = `[${linkText}](${text})`
                    }

                    const nextSelection = {
                        start: selection.start + linkText.length,
                        end: selection.start + linkText.length
                    }

                    update($insertText(valueRef.current, newText, selection), nextSelection)
                    setAbsoluteTextSelection(root, nextSelection.start, nextSelection.end)
                } else {
                    const nextSelection = {
                        start: selection.start + text.length,
                        end: selection.start + text.length
                    }

                    update($insertText(valueRef.current, text, selection), nextSelection)
                    setAbsoluteTextSelection(root, nextSelection.start, nextSelection.end)
                }
            }}
            onKeyDown={(e) => {

                const root = rootRef.current
                if (!root) return

                const domSelection = getAbsoluteTextSelection(root)
                if (!domSelection) return
                const selection = transposeSelection(domSelection)

                const startDelta = selection.start - domSelection.start
                const endDelta = selection.end - domSelection.end


                if (e.ctrlKey && e.key === "b") {
                    e.preventDefault()
                    boldSelection()
                }

                if (e.ctrlKey && e.key === "i") {
                    e.preventDefault()
                    italicSelection()
                }

                if (e.key === "Enter") {
                    e.preventDefault()

                    const nextSelection = {
                        start: selection.start + 1 - startDelta,
                        end: selection.start + 1 - endDelta
                    }

                    update($insertText(valueRef.current, "\n", selection), nextSelection)
                    setAbsoluteTextSelection(root, nextSelection.start, nextSelection.end)
                }

                if (e.key === "Delete") {
                    e.preventDefault()

                    if (e.ctrlKey) {
                        // Ctrl+Delete : supprimer jusqu'à la fin du mot suivant
                        const nextWordEnd = findNextWordEnd(valueRef.current, selection.start)
                        const wordSelection = { start: selection.start, end: nextWordEnd }

                        const nextSelection = {
                            start: selection.start - startDelta,
                            end: selection.start - endDelta
                        }

                        update($deleteText(valueRef.current, wordSelection), nextSelection)
                        setAbsoluteTextSelection(root, nextSelection.start, nextSelection.end)
                    } else {
                        // Delete normal
                        const charAtSelection = valueRef.current[selection.start]

                        const nextSelection = {
                            start: selection.start - startDelta,
                            end: selection.start - endDelta
                        }

                        if (charAtSelection === '[' && selection.start === selection.end) {
                            // On est au début d'un lien, on veut supprimer le premier caractère du texte
                            const modifiedSelection = { start: selection.start + 1, end: selection.start + 2 }
                            update($deleteText(valueRef.current, modifiedSelection), nextSelection)
                        } else {
                            update($deleteText(valueRef.current, selection), nextSelection)
                        }
                        setAbsoluteTextSelection(root, nextSelection.start, nextSelection.end)
                    }
                }

                if (e.key === "Backspace") {
                    e.preventDefault()

                    if (selection.start === 0 && selection.end === 0) return

                    if (e.ctrlKey) {
                        // Ctrl+Backspace : supprimer jusqu'au début du mot précédent
                        const prevWordStart = findPrevWordStart(valueRef.current, selection.start)
                        const wordSelection = { start: prevWordStart, end: selection.start }

                        const nextSelection = {
                            start: prevWordStart - startDelta,
                            end: prevWordStart - endDelta
                        }

                        update($deleteText(valueRef.current, wordSelection), nextSelection)
                        setAbsoluteTextSelection(root, nextSelection.start, nextSelection.end)
                    } else {
                        // Backspace normal
                        const nextSelection = selection.start === selection.end
                            ? { start: selection.start - 1 - startDelta, end: selection.start - 1 - endDelta }
                            : { start: selection.start - startDelta, end: selection.start - endDelta }

                        update($backspaceText(valueRef.current, selection), nextSelection)
                        setAbsoluteTextSelection(root, nextSelection.start, nextSelection.end)
                    }
                }

                if (!e.ctrlKey && e.key.length === 1) {
                    e.preventDefault()

                    // Détecter si on est à la fin d'un lien
                    const isAtEndOfLink = isAtEndOfLinkElement(valueRef.current, selection.start)

                    if (isAtEndOfLink && selection.start === selection.end) {
                        // Sortir du lien : ajouter un espace puis le caractère
                        const textToInsert = ` ${e.key}`

                        const nextSelection = {
                            start: selection.start + textToInsert.length - startDelta,
                            end: selection.start + textToInsert.length - endDelta
                        }

                        update($insertText(valueRef.current, textToInsert, selection), nextSelection)
                        setAbsoluteTextSelection(root, nextSelection.start, nextSelection.end)
                    } else {
                        // Comportement normal
                        const nextSelection = {
                            start: selection.start + 1 - startDelta,
                            end: selection.start + 1 - endDelta
                        }

                        update($insertText(valueRef.current, e.key, selection), nextSelection)
                        setAbsoluteTextSelection(root, nextSelection.start, nextSelection.end)
                    }
                }
            }}

            onKeyUp={(e) => {
                e.preventDefault()
                if (!rootRef.current) return
                const domSelection = getAbsoluteTextSelection(rootRef.current)
                if (!domSelection) return

                const selection = transposeSelection(domSelection)
                setCurrentSelection(selection)
                // console.log(selection?.start)
            }}
            onPointerUp={() => {

                if (!rootRef.current) return
                const domSelection = getAbsoluteTextSelection(rootRef.current)
                if (!domSelection) return

                const selection = transposeSelection(domSelection)
                setCurrentSelection(selection)
            }}
        />
    </div>

    function transposePosition(position: number) {
        let start = 0
        let i = 0
        while (i < position && start < valueRef.current.length) {
            const next = valueRef.current.slice(start)
            if (next.startsWith('***')) {
                start += 3
            } else if (next.startsWith('**') || next.startsWith('__')) {
                start += 2
            } else if (next.startsWith('[')) {
                const endBracket = next.indexOf(']')
                const startParen = next.indexOf('(', endBracket)
                const endParen = next.indexOf(')', startParen)
                if (endBracket !== -1 && startParen !== -1 && endParen !== -1) {
                    start++
                } else {
                    start++
                    i++
                }
            } else if (valueRef.current[start] === ']') {
                const linkStart = valueRef.current.lastIndexOf('[', start)
                if (linkStart !== -1) {
                    const afterBracket = start + 1
                    const startParen = valueRef.current.indexOf('(', afterBracket)
                    const endParen = valueRef.current.indexOf(')', startParen)
                    if (startParen !== -1 && endParen !== -1 && startParen === afterBracket) {
                        start = endParen + 1
                    } else {
                        start++
                        i++
                    }
                } else {
                    start++
                    i++
                }
            } else {
                start++
                i++
            }
        }
        return start
    }

    function link() {
        const root = rootRef.current
        if (!root) return

        const domSelection = getAbsoluteTextSelection(root)
        if (!domSelection) return
        const selection = transposeSelection(domSelection)


        const nextSelection = {
            start: selection.start,
            end: selection.end
        }

        update($wrapText(valueRef.current, selection, '[', '](#bla)'), nextSelection)
        setAbsoluteTextSelection(root, nextSelection.start, nextSelection.end)


    }

    function boldSelection() {
        toggleInlineStyle('**', '**')
    }

    function italicSelection() {
        toggleInlineStyle('__', '__')
    }

    function toggleInlineStyle(before: string, after: string) {
        const root = rootRef.current
        if (!root) return

        const domSelection = getAbsoluteTextSelection(root)
        if (!domSelection) return
        const selection = transposeSelection(domSelection)

        const beforeText = valueRef.current.slice(0, selection.start + before.length)
        const afterText = valueRef.current.slice(selection.end)
        const insideText = valueRef.current.slice(selection.start + before.length, selection.end)

        const nextSelection = {
            start: selection.start,
            end: selection.end
        }

        if (beforeText.endsWith(before) && afterText.startsWith(after)) {
            nextSelection.end -= before.length

            update(beforeText.slice(0, -before.length) + insideText + afterText.slice(after.length), nextSelection)
            setAbsoluteTextSelection(root, nextSelection.start, nextSelection.end)
        }

        else {

            update($wrapText(valueRef.current, selection, before, after), nextSelection)
            setAbsoluteTextSelection(root, nextSelection.start, nextSelection.end)
        }
    }

    function transposeSelection(selection: TextSelection) {
        return {
            start: transposePosition(selection.start),
            end: transposePosition(selection.end)
        }
    }

    function init() {
        const root = rootRef.current
        if (!root) return
        root.innerHTML = markdownToHTML(value)
    }

    function update(markdown: string, currentSelection: TextSelection) {
        const cleanedMarkdown = cleanMarkdown(markdown)
        valueRef.current = cleanedMarkdown

        // Sauvegarder dans l'historique avec la sélection avant modification
        historyRef.current.push({ markdown: cleanedMarkdown, selection: currentSelection })

        // Limiter l'historique à 100 entrées
        if (historyRef.current.length > 100) {
            historyRef.current.shift()
        }

        // Nettoyer le forward history quand on fait une nouvelle action
        forwardHistoryRef.current = []

        formatContent()
        onValueChange(valueRef.current)
    }

    function formatContent() {

        const markdown = valueRef.current
        const rootElement = rootRef.current
        if (!rootElement) return

        rootElement.innerHTML = markdownToHTML(markdown)
    }


    function cleanMarkdown(markdown: string) {
        return markdown
        // return markdown
        //     .replace(/\*\*\*\*\*\*/g, '')
        //     .replace(/\*\*\*\*/g, '')
        //     .replace(/____/g, '')
        //     .replace(/\[\]\([^)]*\)/g, '')
        //     .replace(/(^|\s)\]\([^)]*\)/g, '$1')
    }

    function isURL(text: string): boolean {
        try {
            new URL(text);
            return true;
        } catch {
            return false;
        }
    }

    function findNextWordEnd(text: string, position: number): number {
        let i = position

        // Si on est déjà à la fin, retourner la position actuelle
        if (i >= text.length) return i

        // Passer les espaces/caractères non-alphabétiques au début
        while (i < text.length && /\s/.test(text[i])) {
            i++
        }

        // Si on a que des espaces jusqu'à la fin
        if (i >= text.length) return text.length

        // Avancer jusqu'à la fin du mot (jusqu'au prochain espace ou caractère spécial)
        while (i < text.length && /\w/.test(text[i])) {
            i++
        }

        return i
    }

    function findPrevWordStart(text: string, position: number): number {
        let i = position

        // Si on est déjà au début, retourner la position actuelle
        if (i <= 0) return i

        // Passer les espaces/caractères non-alphabétiques à la fin
        while (i > 0 && /\s/.test(text[i - 1])) {
            i--
        }

        // Si on a que des espaces jusqu'à la fin
        if (i <= 0) return 0

        // Reculer jusqu'à la fin du mot (jusqu'au prochain espace ou caractère spécial)
        while (i > 0 && /\w/.test(text[i - 1])) {
            i--
        }

        return i
    }

    function isAtEndOfLinkElement(text: string, position: number): boolean {
        // Vérifier si on est exactement sur un ']'
        if (text[position] === ']') {
            // Vérifier si c'est suivi de '(url)'
            let i = position + 1
            if (i < text.length && text[i] === '(') {
                // Trouver la fin de l'URL
                while (i < text.length && text[i] !== ')') {
                    i++
                }
                // Si on trouve la fermeture ')', c'est bien un lien
                return i < text.length && text[i] === ')'
            }
        }
        return false
    }
};