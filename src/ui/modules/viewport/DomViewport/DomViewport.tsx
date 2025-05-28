'use client'

import { useRef } from 'react';
import { handleDrag } from '../../../handlers/handleDrag';
import { useDomViewportZoom } from './hooks/useDomViewportZoom';
import { useDivElementRef } from '../../../hooks/dom/useDivElementRef';
import { useDomViewportGeometry } from './hooks/useDomViewportGeometry';
import { usePreventSystemZoom } from '../../../hooks/dom/usePreventSystemZoom';

import classNameModule from '../../../core/classname';
import styles from './DomViewport.module.scss';

const className = classNameModule(styles)

type DomViewportProps = {
    children: React.ReactNode
}

export const DomViewport = ({ children }: DomViewportProps) => {
    const rootElement = useDivElementRef()
    const contentElement = useDivElementRef()
    const transformRef = useRef<{ x: number, y: number, scale: number }>({ x: 0, y: 0, scale: 1 })

    const geometry = useDomViewportGeometry((geometry) => {
        transformRef.current = {
            x: geometry.position.x,
            y: geometry.position.y,
            scale: geometry.scale
        }
        updateTransform()
    })

    const { onWheel } = useDomViewportZoom(geometry)

    usePreventSystemZoom(rootElement.ref)

    return <div
        {...className('DomViewport')}
        ref={rootElement.ref}
        onContextMenu={e => e.preventDefault()}
        onWheel={onWheel}
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
        <div
            ref={contentElement.ref}

        >
            {children}
        </div>
    </div>;

    function updateTransform() {
        if (!contentElement.ref.current) return
        contentElement.ref.current.style.transform = `translate(${transformRef.current.x}px, ${transformRef.current.y}px) scale(${transformRef.current.scale})`
        contentElement.ref.current.style.transformOrigin = '0 0'
    }
};