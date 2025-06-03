import { useEventListeners } from "@ui/hooks/useEventListeners"
import { createContext, useCallback, useContext, useEffect, useRef } from "react"
import { HSVaColor } from "./ColorPicker.types"
import { hsvaEquals, hsvaToHex, parseColor } from "./ColorPicker.utils"

type ListenersTypes = {
    'change': HSVaColor,
    'change:hue': { hue: number },
    'change:alpha': { alpha: number },
    'change:gradient': { saturation: number, value: number },
}

export type ColorPickerEventName = 'change:hue' | 'change:alpha' | 'change:gradient'

export type ColorPickerContextType = {
    addEventListener: <T extends keyof ListenersTypes>(event: T, callback: (color: ListenersTypes[T]) => void) => void,
    removeEventListener: <T extends keyof ListenersTypes>(event: T, callback: (color: ListenersTypes[T]) => void) => void,
    setHue: (hue: number) => void,
    setAlpha: (alpha: number) => void,
    setGradient: (saturation: number, value: number) => void,
    setColor: (color: HSVaColor) => void,
    getColor: () => HSVaColor,
}

const colorPickerContext = createContext<ColorPickerContextType | null>(null)

type ColorPickerProviderProps = {
    children: React.ReactNode
    value?: string
    onChange?: (color: string) => void
}

export const ColorPickerProvider = ({ children, value: valueInput, onChange }: ColorPickerProviderProps) => {
    const listeners = useEventListeners<ListenersTypes>()
    const currentColor = useRef<HSVaColor>(parseColor(valueInput))
    const currentValueRef = useRef(valueInput)

    const handleUpdate = useCallback((color: HSVaColor) => {
        const previousColor = currentColor.current
        if (previousColor.hue !== color.hue) {
            listeners.dispatchEvent('change:hue', { hue: color.hue })
        }

        if (previousColor.alpha !== color.alpha) {
            listeners.dispatchEvent('change:alpha', { alpha: color.alpha })
        }

        if (previousColor.saturation !== color.saturation || previousColor.value !== color.value) {
            listeners.dispatchEvent('change:gradient', { saturation: color.saturation, value: color.value })
        }

        currentColor.current = color

        if (!hsvaEquals(color, currentColor.current)) {
            listeners.dispatchEvent('change', color)
        }
    }, [listeners])

    // useEffect(() => {
    //     if (valueInput && currentValueRef.current !== valueInput && isValidHex(valueInput)) {
    //         const color = parseColor(valueInput)

    //         if (
    //             !hsvaEquals(color, currentColor.current)
    //         ) {
    //             console.log(currentValueRef.current, valueInput)
    //             handleUpdate(color)
    //             currentValueRef.current = valueInput
    //         }
    //     }
    // }, [valueInput, currentValueRef, handleUpdate])


    return <colorPickerContext.Provider value={{
        addEventListener: listeners.addEventListener,
        removeEventListener: listeners.removeEventListener,
        setColor: (color: HSVaColor) => {
            handleUpdate(color)

            currentValueRef.current = hsvaToHex(color)
            onChange?.(currentValueRef.current)
        },
        setHue: (hue: number) => {
            currentColor.current.hue = hue
            listeners.dispatchEvent('change:hue', { hue })
            listeners.dispatchEvent('change', currentColor.current)

            currentValueRef.current = hsvaToHex(currentColor.current)
            onChange?.(currentValueRef.current)
        },
        setAlpha: (alpha: number) => {
            currentColor.current.alpha = alpha
            listeners.dispatchEvent('change:alpha', { alpha })
            listeners.dispatchEvent('change', currentColor.current)
            currentValueRef.current = hsvaToHex(currentColor.current)
            onChange?.(currentValueRef.current)
        },
        setGradient: (saturation: number, value: number) => {
            currentColor.current.saturation = saturation
            currentColor.current.value = value
            listeners.dispatchEvent('change:gradient', { saturation, value })
            listeners.dispatchEvent('change', currentColor.current)

            currentValueRef.current = hsvaToHex(currentColor.current)
            onChange?.(currentValueRef.current)

        },
        getColor: () => currentColor.current
    }}>{children}</colorPickerContext.Provider>



}

export function useColorPickerContext() {
    const context = useContext(colorPickerContext)
    if (!context) {
        throw new Error('useColorPickerContext must be used within a ColorPickerProvider')
    }
    return context
}


export function useColorPickerListener<T extends keyof ListenersTypes>(event: T, callback: (color: ListenersTypes[T]) => void) {
    const context = useColorPickerContext()
    useEffect(() => {
        context.addEventListener(event, callback)
        return () => {
            context.removeEventListener(event, callback)
        }
    }, [event, callback, context])
}
