'use client'

import React, { forwardRef, useImperativeHandle, useRef, useState } from "react"

import { createPortal } from "react-dom";
import { useClickOutsideRef } from "../../hooks/useClickOutsideRef";

import classNameModule from '../../core/classname';
import styles from './ContextMenu.module.scss';
const className = classNameModule(styles)

type ContextMenuHandler = {
    open: () => void
    close: () => void
}

export function useContextMenu() {
    const ref = useRef<ContextMenuHandler>(null)

    return {
        ref,
        close: () => {
            ref.current?.close()
        },
        open: () => {
            ref.current?.open()
        }
    }
}

type ContextMenuProps = {
    children?: React.ReactNode | ((props: { handleClose: () => void }) => React.ReactNode)
    content?: React.ReactNode | ((props: { handleClose: () => void }) => React.ReactNode)
}

export const ContextMenu = forwardRef<ContextMenuHandler, ContextMenuProps>(({ children, content }: ContextMenuProps, ref) => {
    const [position, setPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 })

    const [isOpen, setIsOpen] = useState(false)

    useImperativeHandle(ref, () => ({
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
    }))

    return <div>
        {
            isOpen && (
                <ContextMenuMenu position={position} onClose={() => setIsOpen(false)} content={content} />
            )
        }
        <div onContextMenu={e => {
            e.preventDefault()
            setPosition({ x: e.clientX, y: e.clientY })
            setIsOpen(true)
        }}>
            {typeof children === 'function' ? children({ handleClose: () => setIsOpen(false) }) : children}
        </div>
    </div >
})

ContextMenu.displayName = 'ContextMenu'


type ContextMenuMenuProps = {
    position: { x: number, y: number }
    onClose: () => void
    content: React.ReactNode | ((props: { handleClose: () => void }) => React.ReactNode)
}

const ContextMenuMenu = ({ position, onClose, content }: ContextMenuMenuProps) => {
    const ref = useClickOutsideRef<HTMLDivElement>(() => {
        onClose()
    })


    return createPortal(<div {...className('ContextMenuMenu')}
        ref={ref}
        style={{ top: position.y, left: position.x }}>
        {typeof content === 'function' ? content({ handleClose: onClose }) : content}
    </div>, document.body)
}