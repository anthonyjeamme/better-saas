import { forwardRef, useImperativeHandle, useRef } from 'react';

import { useGameLoop } from '../../../../hooks/useGameLoop';
import { useResizeObserver } from '../../../../hooks/useResizeObserver';
import { useDivElementRef } from '../../../../hooks/dom/useDivElementRef';
import { useGameCanvasGeometry } from '../../hooks/useGameCanvasGeometry';
import { useCanvasElementRef } from '../../../../hooks/dom/useCanvasElementRef';
import { preventDefault } from '../../../../handlers/preventDefault';

import classNameModule from '../../../../core/classname';
import styles from './GameCanvas.module.scss';
const className = classNameModule(styles)

type GameCanvasProps = {
    render?: (ctx: CanvasRenderingContext2D) => void
    renderUI?: (ctx: CanvasRenderingContext2D, size: { width: number, height: number }) => void
}

export type GameCanvasHandler = {
    get position(): { x: number, y: number }
    set position(value: { x: number, y: number })
    get rotation(): number
    set rotation(value: number)
}


export function useGameCanvas() {
    const ref = useRef<GameCanvasHandler>(null)

    return {
        ref,
        get position() {
            if (!ref.current) throw new Error('GameCanvas is not mounted')
            return ref.current?.position
        },
        set position(value: { x: number, y: number }) {
            if (!ref.current) throw new Error('GameCanvas is not mounted')
            ref.current.position = value
        },
        get rotation() {
            if (!ref.current) throw new Error('GameCanvas is not mounted')
            return ref.current?.rotation
        },
        set rotation(value: number) {
            if (!ref.current) throw new Error('GameCanvas is not mounted')
            ref.current.rotation = value
        }
    }
}

export const GameCanvas = forwardRef<GameCanvasHandler, GameCanvasProps>(({ render, renderUI }, ref) => {

    const root = useDivElementRef()
    const canvas = useCanvasElementRef()
    const geometry = useGameCanvasGeometry()

    useResizeObserver(root.ref, canvas.resize)

    useImperativeHandle(ref, () => {
        return {
            get position() {
                return geometry.position
            },
            set position(value: { x: number, y: number }) {
                geometry.position = value
            },
            get rotation() {
                return geometry.rotation
            },
            set rotation(value: number) {
                geometry.rotation = value
            }
        }
    })

    useGameLoop(() => {
        try {
            const ctx = canvas.ref.current?.getContext('2d')
            if (!ctx) return
            ctx.save()
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

            const translation = {
                x: -geometry.position.x + ctx.canvas.width / 2,
                y: -geometry.position.y + ctx.canvas.height / 2
            }

            ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2)
            ctx.rotate(-geometry.rotation - Math.PI / 2)
            ctx.translate(-ctx.canvas.width / 2 + translation.x, -ctx.canvas.height / 2 + translation.y)
            render?.(ctx)
            ctx.restore()

            ctx.save()
            renderUI?.(ctx, { width: ctx.canvas.width, height: ctx.canvas.height })
            ctx.restore()

        } catch { }
    }, [])

    return <div {...className('GameCanvas')} ref={root.ref} onContextMenu={preventDefault}>
        <canvas ref={canvas.ref} />
    </div>;
})

GameCanvas.displayName = 'GameCanvas'