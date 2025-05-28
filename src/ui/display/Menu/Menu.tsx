import { createPortal } from 'react-dom';
import { useInsertionEffect, useRef } from 'react';
import { FolderIcon, MenuIcon, TrashIcon, XIcon } from 'lucide-react';

import { Button } from '@ui/primitives';
import { Portal } from '@ui/layout/Portal';
import { ExtendedSizeVariant } from '@ui/core/types';
import { useDisclosure } from '@ui/hooks/useDisclosure';
import { useDocumentPositionEvent } from '@ui/hooks/useDocumentPositionEvent';

import classNameModule from '@ui/core/classname';
import styles from './Menu.module.scss';
const className = classNameModule(styles)

type MenuProps = {
    size?: ExtendedSizeVariant
}

export const Menu = ({ size = 'md' }: MenuProps) => {
    const rootRef = useRef<HTMLDivElement>(null)
    const disclosure = useDisclosure()

    return <div {...className('Menu')} ref={rootRef}>
        <Button variant='outline'
            shape='square'
            size={size}
            onClick={() => {
                disclosure.toggle()
            }}
            onKeyDown={e => {
                if (e.key === "Escape" && disclosure.isOpen) {
                    disclosure.close()
                    e.stopPropagation()
                    e.preventDefault()
                }
            }}>
            {
                disclosure.isOpen ? <XIcon style={{
                    height: `var(--font-size-${size})`
                }} /> : <MenuIcon style={{
                    height: `var(--font-size-${size})`
                }} />
            }
        </Button>
        {
            disclosure.isOpen && (
                createPortal(<Dropdown parentRef={rootRef}
                    position={{
                        horizontal: 'left',
                        vertical: 'bottom',
                        side: false
                    }}
                >
                    <Button size='sm' variant='ghost' onClick={() => {
                        // close()
                    }}><FolderIcon size={14} /><span>Open</span></Button>
                    <Button size='sm' variant='ghost' onClick={() => {
                        // close()
                    }}><TrashIcon size={14} /><span>Remove</span></Button>
                    <Button size='sm' variant='ghost' onClick={() => {
                        // close()
                    }}><FolderIcon size={14} /><span>Open</span></Button>
                    <Button size='sm' variant='ghost' onClick={() => {
                        // close()
                    }}><TrashIcon size={14} /><span>Remove</span></Button>
                    <Button size='sm' variant='ghost' onClick={() => {
                        // close()
                    }}><FolderIcon size={14} /><span>Open</span></Button>
                    <Button size='sm' variant='ghost' onClick={() => {
                        // close()
                    }}><TrashIcon size={14} /><span>Remove</span></Button>
                </Dropdown>, document.body)
            )
        }
    </div>;
};


type DropdownProps = {
    children: React.ReactNode
    parentRef: React.RefObject<HTMLDivElement | null>
    position?: {
        vertical?: 'top' | 'bottom'
        horizontal?: 'left' | 'right',
        side?: boolean
    }
}


const Dropdown = ({ children, parentRef, position = {} }: DropdownProps) => {

    const MARGIN = 20
    const dropdownRef = useRef<HTMLDivElement>(null)
    const referenceRef = useRef<HTMLDivElement>(null)

    const vertical = position.vertical ?? 'bottom'
    const horizontal = position.horizontal ?? 'left'
    const side = position.side ?? false

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
