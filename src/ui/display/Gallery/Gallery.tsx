import { Children, useRef, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

import { animate } from '../../functions/animate';
import { useHotkeys } from '../../hooks/useHotkey';

import classNameModule from '../../core/classname';
import styles from './Gallery.module.scss';
const className = classNameModule(styles)

type GalleryProps = {
    children: React.ReactNode
}

/**
 * WIP
 */
export const Gallery = ({ children }: GalleryProps) => {

    const items = Children.toArray(children)

    const [currentIndex, setCurrentIndex] = useState(0)

    const contentRef = useRef<HTMLDivElement>(null)

    useHotkeys({
        'arrowleft': () => {
            transition('left')
        },
        'arrowright': () => {
            transition('right')
        }
    })


    const [transitionContent, setTransitionContent] = useState<React.ReactNode>(null)
    const transitionContentRef = useRef<HTMLDivElement>(null)

    const isAnimatingRef = useRef(false)

    return <div {...className('Gallery')}>
        <button {...className('PreviousButton')} onClick={() => {

            transition('left')
        }}>
            <ChevronLeftIcon size={15} />
        </button>

        <div {...className('content')} ref={contentRef}>
            {items[currentIndex]}
        </div>

        {
            transitionContent && (
                <div {...className('transition-content')} ref={transitionContentRef}>{transitionContent}</div>
            )
        }

        <button {...className('NextButton')} onClick={() => {
            transition('right')
        }}>
            <ChevronRightIcon size={15} />
        </button>

    </div>;


    function transition(direction: 'left' | 'right') {

        if (isAnimatingRef.current) return
        isAnimatingRef.current = true


        function getNextIndex() {
            if (direction === "left") {
                return (currentIndex - 1 + items.length) % items.length
            } else {
                return ((currentIndex + 1) % items.length)
            }
        }
        const nextIndex = getNextIndex()


        setTransitionContent(items[nextIndex])

        const DURATION = 500

        requestAnimationFrame(() => {
            const transitionContentElement = transitionContentRef.current
            const contentElement = contentRef.current

            if (!transitionContentElement || !contentElement) return


            const a = animate(contentElement, [
                { transform: direction === "right" ? 'translateX(-100%)' : 'translateX(100%)' },
            ], {
                duration: DURATION,
                easing: 'ease-in-out',
                fill: 'forwards'
            })

            const b = animate(transitionContentElement, [
                { transform: direction === "right" ? 'translateX(100%)' : 'translateX(-100%)' },
                { transform: 'none' }
            ], {
                duration: DURATION,
                easing: 'ease-in-out',
                fill: 'forwards'
            })

            Promise.all([a.promise, b.promise]).then(() => {
                requestAnimationFrame(() => {
                    a.cancel()
                    b.cancel()
                    contentElement.style.opacity = '0'
                    setCurrentIndex(nextIndex)

                    setTimeout(() => {
                        contentElement.style.opacity = '1'
                        setTransitionContent(null)
                    }, 200)
                })
                isAnimatingRef.current = false
            })
        })
    }
};