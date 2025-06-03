import { useRef } from "react"
import { useColorPickerContext, useColorPickerListener } from "../ColorPicker.context"

import { hsvaToHex } from "../ColorPicker.utils"
import { Slider, useSliderHandler } from "../Slider/Slider"

type OpacityHandler = {
    setOpacity: (opacity: number) => void
}

export function useOpacityHandler() {
    const ref = useRef<OpacityHandler>(null)

    return {
        ref,
        setOpacity: (opacity: number) => {
            ref.current?.setOpacity(opacity)
        }
    }
}

type OpacityProps = {
    direction?: 'horizontal' | 'vertical'
}

export const Opacity = ({ direction = 'horizontal' }: OpacityProps) => {
    const slider = useSliderHandler()

    const { setAlpha, getColor } = useColorPickerContext()
    useColorPickerListener('change', (color) => {
        const hex = hsvaToHex({
            alpha: 1,
            hue: color.hue,
            saturation: color.saturation,
            value: color.value
        })


        slider.setGradient([
            {
                color: 'transparent',
            }, {
                color: hex
            }
        ])

        slider.setValue(color.alpha)
    })

    return <Slider
        ref={slider.ref}
        direction={direction}
        initialGradient={[
            { color: 'transparent' },
            { color: hsvaToHex(getColor()) }
        ]}
        onChange={value => {
            setAlpha(value)
        }}
        showTransparenceBackground
        initialValue={getColor().alpha}
    />
}
