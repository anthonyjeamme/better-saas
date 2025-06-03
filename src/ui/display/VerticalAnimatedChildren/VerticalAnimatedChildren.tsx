import { animate } from "../../functions/animate"
import { useEffect, useRef, useState, Children } from "react"

const DURATION = 200

const ENTRY_ANIMATION_OPTIONS = {
    duration: DURATION,
    easing: 'ease-out',
}

const MOVE_ANIMATION_OPTIONS = {
    duration: DURATION,
    easing: 'ease-out',
}

// const EXIT_ANIMATION_OPTIONS: KeyframeAnimationOptions = {
//     duration: DURATION,
//     easing: 'ease-out',
//     fill: 'forwards'
// }

export const VerticalAnimatedChildren = ({ children }: { children: React.ReactNode }) => {
    const [memoizedChildren, setMemoizedChildren] = useState(children)
    const rootRef = useRef<HTMLDivElement>(null)
    const animations = useAnimations()

    useEffect(() => {
        const childrenArray = Children.toArray(children) as React.ReactElement[]
        const memoizedChildrenArray = Children.toArray(memoizedChildren) as React.ReactElement[]
        const before = measureChildren().map(rect => ({
            ...rect,
            key: memoizedChildrenArray[rect.index]?.key
        }))

        setMemoizedChildren(children)

        requestAnimationFrame(() => {
            const after = measureChildren().map(rect => ({
                ...rect,
                key: childrenArray[rect.index]?.key
            }))
            animations.cancelAll()
            // const removedElements = before.filter(b => !after.some(a => a.key === b.key))
            // if (removedElements.length > 0)
            //     if (rootRef.current)
            //         for (const { element, rect } of removedElements) {

            //             const clone = element.cloneNode(true) as HTMLElement

            //             const rootRect = rootRef.current.getBoundingClientRect()

            //             rootRef.current.appendChild(clone)

            //             clone.style.position = 'absolute'
            //             clone.style.top = `${rect.top - rootRect.top}px`
            //             clone.style.left = `${rect.left - rootRect.left}px`
            //             clone.style.width = `${rect.width}px`
            //             clone.style.height = `${rect.height}px`
            //             clone.style.zIndex = '5'

            //             animations.animate(clone, [
            //                 { opacity: 1, transform: 'none' },
            //                 { opacity: 0, transform: 'translateY(100%)' }
            //             ], EXIT_ANIMATION_OPTIONS).then(() => {
            //                 clone.remove()
            //             })
            //         }

            for (const { element, rect, key } of after) {
                const previous = before.find(b => b.key === key)
                if (!previous) {

                    animations.animate(element, [
                        { transform: `translateY(100%)`, opacity: 0 },
                        { transform: 'none', opacity: 1 }
                    ], ENTRY_ANIMATION_OPTIONS)

                    continue
                }

                const dy = previous.rect.top - rect.top

                if (dy !== 0)
                    animations.animate(element, [
                        { transform: `translateY(${dy}px)` },
                        { transform: 'none' }
                    ], MOVE_ANIMATION_OPTIONS)
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [children])

    return <div ref={rootRef} style={{ position: 'relative' }}>
        {memoizedChildren}
    </div>

    function measureChildren() {
        const rootElement = rootRef.current
        if (!rootElement) return []

        const children = Array.from(rootElement.children)
        const rects: { index: number, rect: DOMRect, element: HTMLElement }[] = []
        for (const child of children) {
            const index = children.indexOf(child)
            const rect = child.getBoundingClientRect()
            rects.push({ index, rect, element: child as HTMLElement })
        }

        return rects
    }
}

function useAnimations() {

    const activeAnimationsRef = useRef<Animation[]>([])
    return {
        cancelAll: () => {
            activeAnimationsRef.current.forEach(animation => animation.cancel())
            activeAnimationsRef.current = []
        },
        animate: async (element: HTMLElement, keyframes: Keyframe[], options: KeyframeAnimationOptions) => {

            const { anim, promise } = animate(element, keyframes, options)

            activeAnimationsRef.current.push(anim)

            await promise
            activeAnimationsRef.current = activeAnimationsRef.current.filter(a => a !== anim)
        }
    }
}
