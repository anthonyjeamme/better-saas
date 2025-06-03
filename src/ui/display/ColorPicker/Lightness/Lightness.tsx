import { useRef } from "react"

import { HSLAColor, HSVaColor } from "../ColorPicker.types"
import { Slider, SliderGradient, useSliderHandler } from "../Slider/Slider"
import { hslaToHex, HSLaToHSVa, hsvaToHsla } from "../ColorPicker.utils"
import { useColorPickerContext, useColorPickerListener } from "../ColorPicker.context"

export const Lightness = () => {
    const slider = useSliderHandler()
    const { setColor, getColor } = useColorPickerContext()
    const currentColorRef = useRef<HSLAColor>(hsvaToHsla(getColor()))

    useColorPickerListener('change', (color) => {
        const hsla = hsvaToHsla(color)
        currentColorRef.current = hsla

        slider.setGradient(getGradient(color))
        slider.setValue(hsla.lightness / 100)
    })

    return <Slider
        ref={slider.ref}
        initialGradient={getGradient(getColor())}
        initialValue={hsvaToHsla(getColor()).lightness / 100}
        onChange={value => {
            const newColor = {
                ...currentColorRef.current,
                lightness: value * 100
            }
            setColor(HSLaToHSVa(newColor))
        }}
    />

    function getGradient(color: HSVaColor): SliderGradient {
        const hsla = hsvaToHsla(color)
        return [
            {
                color: hslaToHex({
                    ...hsla,
                    lightness: 0,
                    alpha: 1
                }),
            },
            {
                color: hslaToHex({
                    ...hsla,
                    lightness: 50,
                    alpha: 1
                }),
                position: 50
            },
            {
                color: hslaToHex({
                    ...hsla,
                    lightness: 100,
                    alpha: 1
                })
            }
        ]
    }
}