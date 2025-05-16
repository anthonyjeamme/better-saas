import { handleDrag } from '@ui/handlers/handleDrag';
import { useRef } from 'react';
import { useValueChangeEffect } from '@ui/hooks/useValueChange';
import { SizeVariant, ThemeVariant } from '@ui/core/types';

import classNameModule from '@ui/core/classname';
import styles from './Slider.module.scss';
const className = classNameModule(styles)

type SliderProps = {
    value: number
    onValueChange: (value: number) => void
    min: number
    max: number
    step?: number
    theme?: ThemeVariant
    size?: SizeVariant
}

export const Slider = ({ value, onValueChange, min, max, step, theme = 'default', size = 'md' }: SliderProps) => {

    const thumbRef = useRef<HTMLDivElement>(null)
    const rootRef = useRef<HTMLDivElement>(null)
    const fillRef = useRef<HTMLDivElement>(null)
    const currentValueRef = useRef(value)
    const isDraggingRef = useRef(false)

    useValueChangeEffect(value, () => {
        if (currentValueRef.current === value || isDraggingRef.current) return
        const percentage = (value - min) / (max - min)
        moveThumb(percentage)
        currentValueRef.current = value
    }, [min, max])

    return <div {...className('Slider', { theme, size })} ref={rootRef}

        style={{

            '--color': `var(--${theme})`,
            '--subtle-color': `var(--subtle-${theme}-background)`
        } as React.CSSProperties}

        {
        ...handleDrag((_, e) => {
            e.preventDefault()

            isDraggingRef.current = true
            const thumbElement = thumbRef.current
            const rootElement = rootRef.current
            if (!thumbElement || !rootElement) return null

            const initialX = e.clientX - rootElement.getBoundingClientRect().x

            const percentage = Math.max(0, Math.min(1, initialX / rootElement.clientWidth))

            const newValue = step !== undefined ? Math.round(min + (max - min) * percentage / step) * step : min + (max - min) * percentage
            moveThumb(percentage)
            onValueChange(newValue)
            currentValueRef.current = newValue

            return {
                onMove: ({ delta }) => {
                    const thumbElement = thumbRef.current
                    if (!thumbElement) return
                    const positionX = initialX + delta.x

                    const percentage = Math.max(0, Math.min(1, positionX / rootElement.clientWidth))

                    const newValue = step !== undefined ? Math.round(min + (max - min) * percentage / step) * step : min + (max - min) * percentage
                    moveThumb(percentage)
                    onValueChange(newValue)
                    currentValueRef.current = newValue

                },
                onEnd: () => {
                    isDraggingRef.current = false
                }
            }
        })
        }
    >
        <div {...className('track')}>
            <div {...className('fill')} ref={fillRef} />
        </div>

        <div
            {...className('thumb')}
            ref={thumbRef}
        />
    </div>;


    /**
     * 
     */
    async function moveThumb(percentage: number) {
        const boundedPercentage = Math.max(0, Math.min(1, percentage))
        const thumb = thumbRef.current
        const fill = fillRef.current
        if (!thumb || !fill) return

        thumb.style.left = `${Math.round(boundedPercentage * 100)}%`
        fill.style.width = `${Math.round(boundedPercentage * 100)}%`
    }
};

