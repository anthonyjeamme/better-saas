import { useRef } from 'react';

import { Input } from '@ui/primitives';

import { Tint } from './Tint/Tint';
import { Opacity } from './Opacity/Opacity';
import { Gradient } from './Gradient/Gradient';
import { HSVaColor } from './ColorPicker.types';

import { ColorPickerProvider, useColorPickerContext, useColorPickerListener } from './ColorPicker.context';
import { hexToHSVa, hslaToRgba, hsvaToHex, hsvaToHsla, isValidHex, rgbaToHex } from './ColorPicker.utils';

import classNameModule from '../../core/classname';
import styles from './ColorPicker.module.scss';
import { RGBChannel } from './RGBChannel/RGBChannel';
import { Saturation } from './Saturation/Saturation';
import { Lightness } from './Lightness/Lightness';
import { EyeDropper } from './EyeDropper/EyeDropper';
const className = classNameModule(styles)


type ColorPickerProps = {
    value?: string
    onChange?: (color: string) => void
    children?: React.ReactNode
}



const ColorPickerContent = ({ children }: ColorPickerProps) => {
    return <div {...className('ColorPicker')}>
        {children}
    </div>
}

export const ColorPicker = (props: ColorPickerProps) => {
    return <ColorPickerProvider value={props.value} onChange={props.onChange}>
        <ColorPickerContent {...props} />
    </ColorPickerProvider>
}


const ColorInput = () => {

    const { setColor, getColor } = useColorPickerContext()
    const inputRef = useRef<HTMLInputElement>(null)
    const hasFocusRef = useRef(false)

    useColorPickerListener('change', (color) => {
        if (hasFocusRef.current) return
        updateInput(color)
    })

    return (
        <Input
            onFocus={() => hasFocusRef.current = true}
            onBlur={() => hasFocusRef.current = false}
            size='sm'
            ref={inputRef}
            defaultValue={hsvaToHex(getColor())}
            onInput={e => {
                const value = e.currentTarget.value
                if (isValidHex(value)) {
                    const hsva = hexToHSVa(value)
                    setColor(hsva)
                }
            }}
        />
    )


    function updateInput(hsva: HSVaColor) {

        if (!inputRef.current) return
        const hex = rgbaToHex(
            hslaToRgba(hsvaToHsla(hsva))
        )
        inputRef.current.value = hex
    }

}

const Preview = () => {
    const { getColor } = useColorPickerContext()

    const colorElementRef = useRef<HTMLDivElement>(null)
    useColorPickerListener('change', (color) => {
        if (!colorElementRef.current) return

        const hex = hsvaToHex({
            alpha: color.alpha,
            hue: color.hue,
            saturation: color.saturation,
            value: color.value
        })

        colorElementRef.current.style.backgroundColor = hex
    })

    return <div {...className('Preview')}>

        <div {...className('background')}></div>
        <div {...className('color')}
            ref={colorElementRef}
            style={{
                background: hsvaToHex(getColor())
            }} />
    </div>
}

type ColorSwatchProps = {
    color: string,
}

const ColorSwatch = ({ color }: ColorSwatchProps) => {
    const { setColor } = useColorPickerContext()
    return <div {...className('ColorSwatch')}
        onClick={() => {
            const hsva = hexToHSVa(color)
            setColor(hsva)
        }}>
        <div {...className('background')}></div>
        <div {...className('color')} style={{ backgroundColor: color }} />
    </div>
}


ColorPicker.Tint = Tint
ColorPicker.Opacity = Opacity
ColorPicker.Gradient = Gradient
ColorPicker.RGBChannel = RGBChannel
ColorPicker.Saturation = Saturation
ColorPicker.Lightness = Lightness
ColorPicker.EyeDropper = EyeDropper
ColorPicker.Preview = Preview
ColorPicker.ColorSwatch = ColorSwatch
ColorPicker.ColorInput = ColorInput