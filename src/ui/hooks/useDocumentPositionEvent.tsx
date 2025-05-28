import { useCallback, useEffect } from "react"
import { useCallbackRef } from "./useCallbackRef"
import { useResizeObserver } from "./useResizeObserver"
import { useWindowResizeEvent } from "./useWindowResizeEvent"
import { useParentsScrollEvent } from "./useParentsScrollEvent"
import { useWindowScrollEvent } from "./events/useWindowScrollEvent"

/**
 * Listen to the position of an element related to the document.
 */
export function useDocumentPositionEvent(
    ref: React.RefObject<HTMLDivElement | null>,
    onChange?: (position: { x: number, y: number, height: number, width: number }) => void
) {
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
    }, [ref, stableOnChange])

    useEffect(() => {
        refresh()
    }, [refresh])

    useResizeObserver(ref, refresh)
    useWindowResizeEvent(refresh)
    useParentsScrollEvent(ref, refresh)
    useWindowScrollEvent(refresh)
    return { refresh }
}
