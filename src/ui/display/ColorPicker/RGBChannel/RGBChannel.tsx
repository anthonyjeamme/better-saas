import { useRef } from "react"
import { useColorPickerContext, useColorPickerListener } from "../ColorPicker.context"
import { hsvaToRgba, rgbaToHex, rgbaToHSVa } from "../ColorPicker.utils"
import { Slider, useSliderHandler } from "../Slider/Slider"
import { HSVaColor } from "../ColorPicker.types"


type RGBChannelProps = {
    channel: 'r' | 'g' | 'b'
}
export const RGBChannel = ({ channel }: RGBChannelProps) => {

    const slider = useSliderHandler()

    const { setColor, getColor } = useColorPickerContext()

    const currentColorRef = useRef<HSVaColor>(getColor())

    useColorPickerListener('change', (color) => {
        const rgba = hsvaToRgba(color)
        currentColorRef.current = color
        const value = rgba[channel] / 255
        slider.setValue(value)
        slider.setGradient(getGradient(color))
    })

    return <Slider
        ref={slider.ref}
        onChange={value => {
            const currentRGBa = hsvaToRgba(currentColorRef.current)
            const newColor = rgbaToHSVa({
                ...currentRGBa,
                [channel]: value * 255
            })
            setColor(newColor)
        }}
        initialValue={hsvaToRgba(getColor())[channel] / 255}
        initialGradient={getGradient(getColor())}
    />

    function getGradient(color: HSVaColor) {
        const rgba = hsvaToRgba(color)
        return [
            {
                color: rgbaToHex({
                    ...rgba,
                    [channel]: 0,
                    a: 1
                }),
            },
            {
                color: rgbaToHex({
                    ...rgba,
                    [channel]: 255,
                    a: 1
                }),
            }
        ]
    }
}