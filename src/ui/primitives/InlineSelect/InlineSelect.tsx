import classNameModule from '@ui/core/classname';
import styles from './InlineSelect.module.scss';
import { useEffect, useRef } from 'react';
import { SizeVariant } from '@ui/_shared/types';
const className = classNameModule(styles)


type InlineSelectProps = {
    options: {
        label: React.ReactNode
        value: string
    }[]
    size?: SizeVariant
    disabled?: boolean
    value?: string
    onValueChange?: (value: string) => void
}

export const InlineSelect = ({ options, size = 'md', disabled = false, value, onValueChange }: InlineSelectProps) => {

    const rootRef = useRef<HTMLDivElement>(null)
    const indicatorRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        moveIndicator()
    }, [value])

    return <div {...className('InlineSelect', { size, disabled })} ref={rootRef}>
        {
            options.map((option) => (
                <button
                    disabled={disabled}
                    key={option.value}
                    {...className('Option')}
                    data-selected={option.value === value}
                    onClick={() => onValueChange?.(option.value)}
                >
                    <span>{option.label}</span>
                </button>
            ))
        }
        <div {...className('Indicator')} ref={indicatorRef} />
    </div>;


    function moveIndicator() {
        const element = rootRef.current
        if (!element) return

        const selectedElement = element.querySelector(`[data-selected="true"]`)
        if (!selectedElement) return

        const rootOffsetLeft = element.getBoundingClientRect().left
        const selectedElementRect = selectedElement.getBoundingClientRect()

        const indicator = indicatorRef.current
        if (!indicator) return


        const borderLeftWidth = getComputedStyle(element).borderLeftWidth


        indicator.style.left = `${selectedElementRect.left - rootOffsetLeft - parseFloat(borderLeftWidth)}px`
        indicator.style.width = `${selectedElementRect.width}px`
    }
};