import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Children, useRef, useState } from 'react';

import { Button } from '../../primitives/Button';

import classNameModule from '../../core/classname';
import styles from './HorizontalScroller.module.scss';
const className = classNameModule(styles)

type HorizontalScrollerProps = {
    children?: React.ReactNode
    columns: number
    tabletColumns?: number
    mobileColumns?: number
}

export const HorizontalScroller = ({ children, columns, tabletColumns, mobileColumns }: HorizontalScrollerProps) => {
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)

    const contentRef = useRef<HTMLDivElement>(null)

    return <div {...className('HorizontalScroller')}
        style={{
            '--gap': `var(--spacing-md)`,
            '--desktop-num-items': columns,
            '--tablet-num-items': tabletColumns ?? columns,
            '--mobile-num-items': mobileColumns ?? tabletColumns ?? columns,
        } as React.CSSProperties}>
        <header>
            <Button
                disabled={!canScrollLeft}
                shape='circle' variant='outline'
                onClick={() => {

                    const contentElement = contentRef.current
                    if (!contentElement) return

                    const computedStyle = window.getComputedStyle(contentElement)
                    const gapValue = parseInt(computedStyle.getPropertyValue('gap'))

                    const scrollLeft = contentElement.scrollLeft
                    contentElement.scrollTo({
                        left: scrollLeft - contentElement.clientWidth - gapValue,
                        behavior: 'smooth'
                    })


                }}
            >
                <ChevronLeftIcon size={16} />
            </Button>
            <Button
                disabled={!canScrollRight}
                shape='circle' variant='outline'
                onClick={() => {

                    const contentElement = contentRef.current
                    if (!contentElement) return

                    const computedStyle = window.getComputedStyle(contentElement)
                    const gapValue = parseInt(computedStyle.getPropertyValue('gap'))

                    const scrollLeft = contentElement.scrollLeft
                    contentElement.scrollTo({
                        left: scrollLeft + contentElement.clientWidth + gapValue,
                        behavior: 'smooth'
                    })

                }}>
                <ChevronRightIcon size={16} />
            </Button>
        </header>
        <div {...className('content')} ref={contentRef} onScroll={handleScroll}>
            {Children.map(children, (child, index) => (
                <div key={index} {...className('Item')}>
                    {child}
                </div>
            ))}
        </div>
    </div>;

    function handleScroll(event: React.UIEvent<HTMLDivElement>) {

        const contentElement = event.currentTarget
        if (!contentElement) return

        const scrollLeft = contentElement.scrollLeft
        const scrollWidth = contentElement.scrollWidth
        const clientWidth = contentElement.clientWidth

        setCanScrollLeft(scrollLeft > 0)
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth)
    }
};