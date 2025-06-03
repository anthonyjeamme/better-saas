import { forwardRef, useImperativeHandle, useRef } from 'react';
import classNameModule from '../../../core/classname';
import styles from './Cursor.module.scss';
const className = classNameModule(styles)


type CursorHandler = {
    setPosition: (position: { x: number, y: number }) => void
}

export function useCursor() {
    const ref = useRef<CursorHandler>({
        setPosition: () => { }
    })

    return {
        ref,
        setPosition: (position: { x: number, y: number }) => {
            ref.current?.setPosition(position)
        }
    }
}


type CursorProps = {
    initPosition: { x: number, y: number }
    backgroundColor?: string
}

export const Cursor = forwardRef<CursorHandler, CursorProps>(({ initPosition, backgroundColor }, ref) => {

    const rootRef = useRef<HTMLDivElement>(null)
    const memoizedInitPositionRef = useRef(initPosition)
    useImperativeHandle(ref, () => ({
        setPosition: (position: { x: number, y: number }) => {
            const rootElement = rootRef.current
            if (!rootElement) return
            rootElement.style.left = `${position.x * 100}%`
            rootElement.style.top = `${position.y * 100}%`
        }
    }))

    return <div {...className('Cursor')} ref={rootRef}
        style={{
            left: `${memoizedInitPositionRef.current.x * 100}%`,
            top: `${memoizedInitPositionRef.current.y * 100}%`,
            backgroundColor
        }}
    />
}
)

Cursor.displayName = 'Cursor'
