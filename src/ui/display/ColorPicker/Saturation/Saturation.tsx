import { useRef } from "react"
import { useColorPickerContext, useColorPickerListener } from "../ColorPicker.context"
import { HSVaColor } from "../ColorPicker.types"
import { hsvaToHex } from "../ColorPicker.utils"
import { Slider, useSliderHandler } from "../Slider/Slider"

export const Saturation = () => {

    const slider = useSliderHandler()

    const currentColorRef = useRef<HSVaColor>({
        alpha: 1,
        hue: 0,
        saturation: 0,
        value: 0
    })

    const { setColor, getColor } = useColorPickerContext()

    useColorPickerListener('change', (color) => {
        currentColorRef.current = color
        slider.setGradient([
            {
                color: hsvaToHex({
                    ...color,
                    saturation: 0,
                    alpha: 1
                }),
            },
            {
                color: hsvaToHex({
                    ...color,
                    saturation: 1,
                    alpha: 1
                }),
            }
        ])
        slider.setValue(color.saturation)
    })

    return <Slider ref={slider.ref}

        initialGradient={[
            {
                color: hsvaToHex({
                    ...getColor(),
                    saturation: 0,
                    alpha: 1
                })
            },
            {
                color: hsvaToHex({
                    ...getColor(),
                    saturation: 1,
                    alpha: 1
                })
            }
        ]}
        initialValue={getColor().saturation}
        onChange={value => {
            setColor({
                ...currentColorRef.current,
                saturation: value
            })
        }}
    />
}