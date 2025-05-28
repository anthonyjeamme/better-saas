import { useEffect, useRef } from 'react';

import { SizeVariant } from '../../core/types';

import classNameModule from '../../core/classname';
import styles from './InlineSelect.module.scss';
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

    return <div {...className('InlineSelect', { disabled })} ref={rootRef}
        style={{
            '--height': `var(--size-${size})`,
            '--padding-h': `var(--spacing-${size})`,
            '--font-size': `var(--font-size-${size})`
        } as React.CSSProperties}
    >
        {
            options.map((option) => (
                <button
                    disabled={disabled}
                    key={option.value}
                    {...className('Option')}
                    data-selected={option.value === value}
                    onClick={() => onValueChange?.(option.value)}
                >
                    {option.label}
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