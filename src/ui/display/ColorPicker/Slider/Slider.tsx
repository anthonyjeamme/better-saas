import { forwardRef, useImperativeHandle, useRef } from 'react';
import classNameModule from '../../../core/classname';
import { Cursor, useCursor } from '../Cursor/Cursor';
import styles from './Slider.module.scss';
import { useRelativePositionDrag } from '@ui/hooks/useRelativePositionDrag';
const className = classNameModule(styles)

type SliderHandler = {
    setValue: (value: number) => void
    setGradient: (gradient: SliderGradient) => void
}

export function useSliderHandler() {
    const ref = useRef<SliderHandler>(null)

    return {
        ref,
        setValue: (value: number) => {
            ref.current?.setValue(value)
        },
        setGradient: (gradient: SliderGradient) => {
            ref.current?.setGradient(gradient)
        }
    }
}

type SliderProps = {
    direction?: 'horizontal' | 'vertical'
    onStart?: (value: number) => void
    onMove?: (value: number) => void
    onEnd?: (value: number) => void
    onChange?: (value: number) => void
    initialGradient?: SliderGradient,
    showTransparenceBackground?: boolean
    initialValue?: number
}

export const Slider = forwardRef<SliderHandler, SliderProps>(({
    direction = 'horizontal',
    onStart, onMove, onEnd, onChange,
    initialGradient, showTransparenceBackground,
    initialValue
}, ref) => {

    const cursor = useCursor()

    const colorBackgroundRef = useRef<HTMLDivElement>(null)

    useImperativeHandle(ref, () => ({
        setValue: (value: number) => {
            if (direction === 'horizontal') {
                cursor.setPosition({ x: value, y: 0.5 })
            } else {
                cursor.setPosition({ x: 0.5, y: value })
            }
        },
        setGradient: (gradient: SliderGradient) => {

            requestAnimationFrame(() => {

                if (colorBackgroundRef.current) {

                    colorBackgroundRef.current.style.background = getSliderGradientCSS(direction, gradient)
                }
            })
        }
    }))

    const { handler } = useRelativePositionDrag(({ x, y }, eventType) => {
        const value = direction === 'horizontal' ? x : y
        if (eventType === 'start') {
            onStart?.(value)
        } else if (eventType === 'move') {
            onMove?.(value)
        } else if (eventType === 'end') {
            onEnd?.(value)
        }
        onChange?.(value)
    })

    return <div {...className('Slider', { direction })}
        {...handler}
    >
        {
            showTransparenceBackground && (
                <div {...className('transparenceBackground')} />
            )
        }
        <div {...className('colorBackground')} ref={colorBackgroundRef} style={{ background: getSliderGradientCSS(direction, initialGradient ?? []) } as React.CSSProperties}></div>

        <Cursor ref={cursor.ref} initPosition={
            direction === 'horizontal' ? { x: initialValue ?? 0.5, y: 0.5 } : { x: 0.5, y: initialValue ?? 0.5 }
        } />
    </div>
});

Slider.displayName = 'Slider'

export type SliderGradient = SliderGradientPoint[]

export type SliderGradientPoint = {
    color: string
    position?: number
}

function getSliderGradientCSS(direction: 'horizontal' | 'vertical', gradient: SliderGradient) {
    return `linear-gradient(to ${direction === "horizontal" ? "right" : "bottom"}, ${gradient.map(point => {
        if (point.position !== undefined)
            return `${point.color} ${point.position}%`

        return point.color
    }).join(', ')})`
}
