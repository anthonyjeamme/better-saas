import { useRelativePositionDrag } from "@ui/hooks/useRelativePositionDrag"
import { useRef } from "react"
import { Cursor, useCursor } from "../Cursor/Cursor"


import classNameModule from '../../../core/classname';
import styles from './Gradient.module.scss';
import { useColorPickerContext, useColorPickerListener } from "../ColorPicker.context"
const className = classNameModule(styles)

type GradientHandler = {
    changeTint: (tint: number) => void
    setValue: ({ saturation, value }: { saturation: number, value: number }) => void
}

export function useGradientHandler() {
    const ref = useRef<GradientHandler>(null)

    return {
        ref,
        changeTint: (tint: number) => {
            ref.current?.changeTint(tint)
        },
        setValue: ({ saturation, value }: { saturation: number, value: number }) => {
            ref.current?.setValue({ saturation, value })
        }
    }
}

export const Gradient = () => {
    const rootRef = useRef<HTMLDivElement>(null)

    const { setGradient, getColor } = useColorPickerContext()

    const { handler } = useRelativePositionDrag(({ x, y }) => {
        setGradient(x, 1 - y)
    })

    useColorPickerListener('change:gradient', ({ saturation, value }) => {
        cursor.setPosition({ x: saturation, y: 1 - value })
    })

    useColorPickerListener('change:hue', ({ hue }) => {
        const rootElement = rootRef.current
        if (!rootElement) return
        rootElement.style.setProperty('--tint-color', `hsl(${hue * 360}, 100%, 50%)`)
    })

    const cursor = useCursor()

    return <div
        ref={rootRef}
        {...className('Gradient')} style={{
            '--tint-color': `hsl(${getColor().hue * 360}, 100%, 50%)`
        } as React.CSSProperties}
        {...handler}
    >
        <Cursor initPosition={{ x: getColor().saturation, y: 1 - getColor().value }} ref={cursor.ref} />
    </div>
}
