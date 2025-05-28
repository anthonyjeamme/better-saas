'use client'

import { handleDrag } from '../../../handlers/handleDrag';
import { preventDefault } from '../../../handlers/preventDefault';
import { useResizeObserver } from '../../../hooks/useResizeObserver';
import { useCanvasViewportZoom } from './hooks/useCanvasViewportZoom';
import { useDivElementRef } from '../../../hooks/dom/useDivElementRef';
import { useCanvasElementRef } from '../../../hooks/dom/useCanvasElementRef';
import { usePreventSystemZoom } from '../../../hooks/dom/usePreventSystemZoom';

import { CanvasViewportOptions } from './CanvasViewport.types';
import { useCanvasViewportGeometry } from './hooks/useCanvasViewportGeometry';

import classNameModule from '../../../core/classname';
import styles from './CanvasViewport.module.scss';
const className = classNameModule(styles)


type CanvasViewportProps = {
    onDraw: (ctx: CanvasRenderingContext2D) => void
    options?: CanvasViewportOptions
}



export const CanvasViewport = ({ onDraw, options }: CanvasViewportProps) => {
    const rootElement = useDivElementRef()
    const canvasElement = useCanvasElementRef()

    const geometry = useCanvasViewportGeometry(render)

    const { onWheel } = useCanvasViewportZoom(geometry, options)

    useResizeObserver(rootElement.ref, size => {
        canvasElement.resize(size)
        render()
    })

    usePreventSystemZoom(rootElement.ref)

    return <div
        {...className('CanvasViewport')}
        ref={rootElement.ref}
        onContextMenu={preventDefault}
    >
        <canvas
            ref={canvasElement.ref}
            onWheel={onWheel}
            {...handleDrag((_, { button }) => {
                if (button === 1) {
                    const initialPosition = { ...geometry.position }

                    return {
                        onMove: ({ delta }) => {
                            geometry.position = {
                                x: initialPosition.x + delta.x,
                                y: initialPosition.y + delta.y
                            }
                        }
                    }
                }
            })}
        />
    </div>;

    function render() {
        const ctx = canvasElement.getContext2D()
        ctx.save()
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

        ctx.translate(geometry.position.x, geometry.position.y)
        ctx.scale(geometry.scale, geometry.scale)

        onDraw(ctx)
        ctx.restore()
    }
};

