import { useCallback, useEffect } from "react"

export function useWindowScrollEvent(callback: (scrollX: number, scrollY: number) => void) {
    const onScroll = useCallback(() => {
        callback(window.scrollX, window.scrollY)
    }, [callback])

    useEffect(() => {
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [onScroll])
}
