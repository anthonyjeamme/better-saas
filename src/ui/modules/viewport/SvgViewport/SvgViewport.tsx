'use client'

import { useRef } from 'react';
import { handleDrag } from '../../../handlers/handleDrag';
import { useDivElementRef } from '../../../hooks/dom/useDivElementRef';

import { useSvgViewportZoom } from './hooks/useSvgViewportZoom';
import { useSvgViewportGeometry } from './hooks/useSvgViewportGeometry';
import { usePreventSystemZoom } from '../../../hooks/dom/usePreventSystemZoom';

import classNameModule from '../../../core/classname';
import styles from './SvgViewport.module.scss';
const className = classNameModule(styles)


type DragEvent = {
    position: { x: number, y: number }
}

type SvgViewportProps = {
    children?: React.ReactNode
    onClick?: (position: { x: number, y: number }) => void
    onDragStart?: (event: DragEvent) => {
        onMove?: (event: DragEvent) => void
        onEnd?: (event: DragEvent) => void
    } | undefined
}

export const SvgViewport = ({ children, onClick, onDragStart }: SvgViewportProps) => {
    const rootElement = useDivElementRef()
    const svgElement = useRef<SVGSVGElement>(null)
    const transformRef = useRef<{ x: number, y: number, scale: number }>({ x: 0, y: 0, scale: 1 })

    const geometry = useSvgViewportGeometry((geometry) => {
        transformRef.current = {
            x: geometry.position.x,
            y: geometry.position.y,
            scale: geometry.scale
        }
        updateTransform()
    })

    const { onWheel } = useSvgViewportZoom(geometry)

    usePreventSystemZoom(rootElement.ref)

    function getPositionFromClient(clientX: number, clientY: number) {

        const element = rootElement.ref.current

        if (!element) return null

        const rect = element.getBoundingClientRect()
        const x = clientX - rect.left
        const y = clientY - rect.top

        return {
            x: (x - geometry.position.x) / geometry.scale,
            y: (y - geometry.position.y) / geometry.scale
        }
    }

    return <div
        {...className('SvgViewport')}
        ref={rootElement.ref}
        onContextMenu={e => e.preventDefault()}
        onWheel={onWheel}
        onClick={e => {
            if (!onClick) return

            const position = getPositionFromClient(e.clientX, e.clientY)
            if (!position) return
            onClick(position)
        }}
        {...handleDrag((_, e) => {

            if (e.button === 0) {


                let position = getPositionFromClient(e.clientX, e.clientY)
                if (!position) return

                const handler = onDragStart?.({ position })

                if (!handleDrag) return

                return {
                    onMove: (_, e) => {
                        position = getPositionFromClient(e.clientX, e.clientY)
                        if (!position) return
                        handler?.onMove?.({ position })
                    },
                    onEnd: () => {
                        if (!position) return
                        handler?.onEnd?.({ position })
                    }
                }
            }
            if (e.button === 1) {
                const initialPosition = { ...geometry.position }

                return {
                    onMove: ({ delta }) => {
                        geometry.setPosition(
                            initialPosition.x + delta.x,
                            initialPosition.y + delta.y
                        )
                    }
                }
            }
        })}
    >
        <svg
            ref={svgElement}
            width="100%"
            height="100%"
        >
            <g>
                {children}
            </g>
        </svg>
    </div>;

    function updateTransform() {
        if (!svgElement.current) return
        const g = svgElement.current.querySelector('g')
        if (!g) return
        g.setAttribute(
            'transform',
            `translate(${transformRef.current.x}, ${transformRef.current.y}) scale(${transformRef.current.scale})`
        )
    }
};