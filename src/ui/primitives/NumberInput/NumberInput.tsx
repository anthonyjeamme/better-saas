'use client'

import { ChevronUpIcon, ChevronDownIcon, MinusIcon, PlusIcon } from 'lucide-react';
import { useRef } from 'react';
import { SizeVariant } from '@ui/_shared/types';

import classNameModule from '@ui/core/classname';
import styles from './NumberInput.module.scss';
const className = classNameModule(styles)

type NumberInputProps = {
    value: number
    onValueChange: (value: number) => void
    format?: 'standard' | 'stepper'
    step?: number
    min?: number
    max?: number
    size?: SizeVariant
}

export const NumberInput = ({ value, onValueChange, format = 'standard', step = 1, min, max, size = 'md' }: NumberInputProps) => {
    const inputRef = useRef<HTMLInputElement>(null)

    return <div {...className('NumberInput', { format, size })}>
        <input
            ref={inputRef}
            {...className('Input')}
            value={value} onChange={e => {
                const value = parseFloat(e.target.value)
                if (isNaN(value)) return
                onValueChange(value)
            }}
            type="number"
        />
        <div {...className('buttons')}
            onPointerDown={e => e.preventDefault()}>

            <button {...className('plusButton')}
                tabIndex={-1}
                onClick={() => {

                    onValueChange(clamp(value + step, min, max))
                    inputRef.current?.focus()
                }}>
                {
                    format === "standard" ? <ChevronUpIcon size={12} /> : <PlusIcon size={15} />
                }
            </button>
            <button
                tabIndex={-1}
                {...className('minusButton')}
                onClick={() => {
                    onValueChange(clamp(value - step, min, max))
                    inputRef.current?.focus()
                }}
            >
                {
                    format === "standard" ? <ChevronDownIcon size={12} /> : <MinusIcon size={15} />
                }
            </button>
        </div>
    </div>;

    function clamp(value: number, min?: number, max?: number) {
        if (min !== undefined && value < min) return min
        if (max !== undefined && value > max) return max
        return value
    }
};