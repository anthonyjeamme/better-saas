'use client'

import { animate } from "../../functions/animate"
import { useEffect, useRef, useState } from "react"

type PresenceProps = {
    children: React.ReactNode
}

export const Presence = ({ children }: PresenceProps) => {
    const rootRef = useRef<HTMLDivElement>(null)
    const [childrenDup, setChildrenDup] = useState(children)
    const animationRef = useRef<ReturnType<typeof animate> | null>(null)

    useEffect(() => {
        const rootElement = rootRef.current
        if (!rootElement) return

        if (animationRef.current) {
            animationRef.current.cancel()
            animationRef.current = null
        }

        if (children) {
            setChildrenDup(children)

            animationRef.current = animate(rootElement, {
                opacity: 1,
                transform: 'translateY(0px)'
            }, {
                duration: 300,
                easing: 'ease-in-out',
                fill: 'forwards'
            })

            animationRef.current.promise.then((canceled) => {
                if (canceled) return
                animationRef.current = null
            })
        } else {
            animationRef.current = animate(rootElement, {
                opacity: 0,
                transform: 'translateY(-5px)'
            }, {
                duration: 300,
                easing: 'ease-in-out',
                fill: 'forwards'
            })

            animationRef.current.promise.then((canceled) => {
                if (canceled) return
                animationRef.current = null
            })
        }

        return () => {
            if (animationRef.current) {
                animationRef.current.cancel()
            }
        }
    }, [children])

    return <div ref={rootRef}>
        {childrenDup}
    </div>
}