import { useColorPickerContext, useColorPickerListener } from "../ColorPicker.context";

import { Slider, SliderGradient, useSliderHandler } from "../Slider/Slider";


type TintProps = {
    direction?: 'horizontal' | 'vertical'
}

export const Tint = ({ direction = 'horizontal' }: TintProps) => {
    const { setHue, getColor } = useColorPickerContext()
    const slider = useSliderHandler()

    useColorPickerListener('change:hue', ({ hue }) => {
        slider.setValue(hue)
    })

    return <Slider
        ref={slider.ref}
        direction={direction}
        initialGradient={TINT_GRADIENT}
        onChange={value => {
            setHue(value)
        }}
        initialValue={getColor().hue}
    />
}

Tint.displayName = 'Tint'


const TINT_GRADIENT: SliderGradient = [
    {
        color: 'rgb(255, 0, 0)',
        position: 0
    },
    {
        color: 'rgb(255, 255, 0)',
        position: 17
    },
    {
        color: 'rgb(0, 255, 0)',
        position: 33
    },
    {
        color: 'rgb(0, 255, 255)',
        position: 50
    },
    {
        color: 'rgb(0, 0, 255)',
        position: 67
    },
    {
        color: 'rgb(255, 0, 255)',
        position: 83
    },
    {
        color: 'rgb(255, 0, 0)',
        position: 100
    }
]
