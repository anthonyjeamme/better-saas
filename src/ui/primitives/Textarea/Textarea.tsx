'use client'
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';

import classNameModule from '@ui/core/classname';
import styles from './Textarea.module.scss';
import { bounds } from '@ui/_shared/utils/math';
const className = classNameModule(styles)

type TextareaHandler = {
    setValue: (value: string) => void
}

type TextareaProps = {
    onChangeValue?: (value: string) => void
    autoSize?: boolean
    resizable?: boolean
    handlerRef?: React.RefObject<TextareaHandler | undefined>
    minRows?: number
    maxRows?: number
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>


export function useTextarea() {
    const handlerRef = useRef<TextareaHandler | undefined>(undefined)
    return {
        updateValue: (value: string) => {
            handlerRef.current?.setValue(value)
        },
        handlerRef
    }
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({
        onChangeValue,
        autoSize,
        value,
        resizable,
        handlerRef,
        minRows,
        maxRows,
        ...props
    }: TextareaProps, ref) => {

        const rootRef = useRef<HTMLTextAreaElement>(null)

        const resize = useCallback(() => {
            const element = rootRef.current
            if (!element) return
            const borderHeight = element.offsetHeight - element.clientHeight
            element.style.height = 'auto'
            const computedStyle = window.getComputedStyle(element)


            const paddingTop = parseInt(computedStyle.paddingTop)
            const paddingBottom = parseInt(computedStyle.paddingBottom)

            const minRowHeight = minRows ? Math.ceil(parseFloat(computedStyle.lineHeight) * minRows + borderHeight + paddingTop + paddingBottom) : 0
            const maxRowHeight = maxRows ? Math.ceil(parseFloat(computedStyle.lineHeight) * maxRows + borderHeight + paddingTop + paddingBottom) : Infinity

            const height = bounds(element.scrollHeight + borderHeight, minRowHeight, maxRowHeight)
            element.style.height = `${height}px`

        }, [minRows, maxRows])

        const setRefs = (element: HTMLTextAreaElement | null) => {
            rootRef.current = element
            if (ref) {
                if (typeof ref === 'function') {
                    ref(element)
                } else {
                    ref.current = element
                }
            }
        }

        useImperativeHandle(handlerRef, () => {
            return {
                setValue: (value: string) => {
                    if (rootRef.current) {
                        rootRef.current.value = value
                        resize()
                    }
                }
            }
        })

        useEffect(() => {
            if (autoSize) {
                resize()
            }
        }, [autoSize, value, resize])

        return <textarea
            ref={setRefs}
            {...className('Textarea', {
                'resizable': resizable
            })}
            {...props}
            value={value}
            onChange={e => onChangeValue?.(e.target.value)}
            onInput={() => {
                if (autoSize) {
                    resize()
                }
            }}
            rows={props.rows ?? minRows ?? 1}

        />


    }
)

Textarea.displayName = 'Textarea'
