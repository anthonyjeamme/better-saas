import { useEffect, useInsertionEffect, useRef } from 'react';

import { useDocumentPositionEvent } from '../../hooks/useDocumentPositionEvent';

import { Portal } from '../../layout/Portal';

import classNameModule from '../../core/classname';
import styles from './Dropdown.module.scss';
const className = classNameModule(styles)


type DropdownProps = {
    children: React.ReactNode
    parentRef: React.RefObject<HTMLDivElement | null>
    position?: {
        vertical?: 'top' | 'bottom'
        horizontal?: 'left' | 'right',
        side?: boolean
    }
    onClose?: () => void
}

export const Dropdown = ({ children, parentRef, position = {}, onClose }: DropdownProps) => {

    const MARGIN = 20
    const dropdownRef = useRef<HTMLDivElement>(null)
    const referenceRef = useRef<HTMLDivElement>(null)

    const vertical = position.vertical ?? 'bottom'
    const horizontal = position.horizontal ?? 'left'
    const side = position.side ?? false


    useEffect(() => {

        function handlePointerDown(e: MouseEvent) {
            if (e.target instanceof HTMLElement) {
                const parentElement = parentRef.current
                const dropdownElement = dropdownRef.current

                if (!parentElement || !dropdownElement) return
                if (parentElement.contains(e.target) || dropdownElement.contains(e.target)) return

                onClose?.()
            }
        }

        window.addEventListener('pointerdown', handlePointerDown)

        return () => {
            window.removeEventListener('pointerdown', handlePointerDown)
        }
    }, [])

    const { refresh } = useDocumentPositionEvent(parentRef, (position) => {
        const referenceElement = referenceRef.current
        if (!referenceElement) return

        referenceElement.style.top = `${position.y}px`
        referenceElement.style.left = `${position.x}px`
        referenceElement.style.width = `${position.width}px`
        referenceElement.style.height = `${position.height}px`


        const dropdownElement = dropdownRef.current
        if (!dropdownElement) return

        dropdownElement.classList.remove(styles['overflow-horizontal'])
        dropdownElement.classList.remove(styles['overflow-vertical'])
        const rect = dropdownElement.getBoundingClientRect()

        {
            const left = rect.left
            const top = rect.top
            const bottom = window.innerHeight - (rect.top + rect.height)
            const right = window.innerWidth - (rect.left + rect.width)

            if (bottom < MARGIN && vertical === "bottom") {
                dropdownElement.classList.add(styles['overflow-vertical'])
            }
            if (top < MARGIN && vertical === "top") {
                dropdownElement.classList.add(styles['overflow-vertical'])
            }

            if (left < MARGIN && horizontal === "left") {
                dropdownElement.classList.add(styles['overflow-horizontal'])
            }
            if (right < MARGIN && horizontal === "right") {
                dropdownElement.classList.add(styles['overflow-horizontal'])
            }
        }
    })

    useInsertionEffect(refresh, [refresh, children])

    return <Portal>
        <div {...className('DropdownContainer')} ref={referenceRef}>
            <div {...className('Dropdown', { vertical, horizontal, side })} ref={dropdownRef}>
                {children}
            </div>
        </div>
    </Portal>
}

Dropdown.displayName = 'Dropdown'
