import { useRef } from "react"
import { useKeyboardEvents } from "./useKeyboardEvents"
import { useStateRef } from "./useStateRef"
import { useWindowBlur } from "./useWindowBlur"


type UseKeyboardStateOptions = {
    keepCase?: boolean
}

/**
 * 
 */
export function useKeyboardState(options?: UseKeyboardStateOptions) {

    const [pressedKeys, setPressedKeys, getPressedKeys] = useStateRef<Set<string>>(new Set())

    useWindowBlur(() => {
        if (getPressedKeys().size > 0)
            setPressedKeys(new Set())
    })

    useKeyboardEvents(e => {
        const key = options?.keepCase ? e.key : e.key.toLowerCase()
        e.preventDefault()
        if (e.type === "keydown") {

            if (getPressedKeys().has(key)) return

            setPressedKeys(keys => {
                const newKeys = new Set(keys)
                newKeys.add(key)
                return newKeys
            })
        } else if (e.type === "keyup") {
            if (!getPressedKeys().has(key)) return

            setPressedKeys(keys => {
                const newKeys = new Set(keys)
                newKeys.delete(key)
                return newKeys
            })
        }
    })

    return {
        isPressed(key: string) {
            return pressedKeys.has(key)
        },
        pressedKeys: Array.from(pressedKeys)
    }
}

/**
 * 
 */
export function useKeyboardStateless(options?: UseKeyboardStateOptions) {
    const pressedKeys = useRef<Set<string>>(new Set())

    useWindowBlur(() => {
        pressedKeys.current = new Set()
    })

    useKeyboardEvents(e => {
        const key = options?.keepCase ? e.key : e.key.toLowerCase()

        if (e.type === "keydown") {
            pressedKeys.current.add(key)
        } else if (e.type === "keyup") {
            pressedKeys.current.delete(key)
        }
    })

    return {
        isPressed(key: string) {
            return pressedKeys.current.has(key)
        },
        getPressedKeys() {
            return pressedKeys.current
        }
    }
}
