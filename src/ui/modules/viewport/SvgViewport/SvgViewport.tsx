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

type SvgViewportProps = {
    children: React.ReactNode
    onClick?: (position: { x: number, y: number }) => void
}

export const SvgViewport = ({ children, onClick }: SvgViewportProps) => {
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

    return <div
        {...className('SvgViewport')}
        ref={rootElement.ref}
        onContextMenu={e => e.preventDefault()}
        onWheel={onWheel}
        onClick={e => {
            if (!onClick) return
            const rect = e.currentTarget.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            onClick({
                x: (x - geometry.position.x) / geometry.scale,
                y: (y - geometry.position.y) / geometry.scale
            })
        }}
        {...handleDrag((_, { button }) => {
            if (button === 1) {
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
        g.setAttribute('transform', `translate(${transformRef.current.x}, ${transformRef.current.y}) scale(${transformRef.current.scale})`)
    }
};