import { useCallback, useEffect, useState } from "react"
import { useCallbackRef } from "./useCallbackRef"
import { useResizeObserver } from "./useResizeObserver"
import { useWindowResizeEvent } from "./useWindowResizeEvent"
import { useParentsScrollEvent } from "./useParentsScrollEvent"

export
    function useDocumentPosition(
        ref: React.RefObject<HTMLDivElement | null>,
        onChange?: (position: { x: number, y: number, height: number, width: number }) => void
    ) {

    const [position, setPosition] = useState<{ x: number, y: number, height: number, width: number }>({ x: 0, y: 0, height: 0, width: 0 })

    const stableOnChange = useCallbackRef(onChange)
    const refresh = useCallback(() => {
        const element = ref.current
        if (!element) return
        const root = document.documentElement
        const rect = element.getBoundingClientRect()
        const position = {
            x: rect.left,
            y: rect.top + root.scrollTop,
            height: rect.height,
            width: rect.width
        }

        stableOnChange(position)
        setPosition(position)
    }, [ref, stableOnChange])

    useEffect(() => {
        refresh()
    }, [refresh])

    useResizeObserver(ref, refresh)
    useWindowResizeEvent(() => refresh)
    useParentsScrollEvent(ref, refresh)
    return { position, refresh }
}
