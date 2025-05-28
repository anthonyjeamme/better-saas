import React, { useRef } from 'react';

import { SizeVariant, ThemeVariant } from '../../core/types';
import { handleDrag } from '../../handlers/handleDrag';

import classNameModule from '../../core/classname';
import styles from './Toggle.module.scss';
const className = classNameModule(styles)

type ToggleProps = {
    value?: boolean
    onValueChange?: (value: boolean) => void
    theme?: ThemeVariant
    size?: SizeVariant
    variant?: 'solid' | 'outline' | 'subtle'
    name?: string
}

export const Toggle = ({ value, onValueChange, theme = 'default', size = 'md', variant = 'solid', name }: ToggleProps) => {

    const rootRef = useRef<HTMLDivElement>(null)

    const currentValueRef = useRef(value)

    return <div
        ref={rootRef}
        {...className('Toggle', { checked: Boolean(value), size, variant })}
        style={{
            '--color': `var(--${theme})`,
            '--color-hover': `var(--${theme}-hover)`,
            '--subtle-background': `var(--subtle-${theme}-background)`,
            '--subtle-background-hover': `var(--subtle-${theme}-background-hover)`,
            '--subtle-border': `var(--subtle-${theme}-border)`,
            '--subtle-border-hover': `var(--subtle-${theme}-border-hover)`,
            '--subtle-text-over': `var(--${theme}-text-over-subtle)`,
        } as React.CSSProperties}
        onClick={() => {
            currentValueRef.current = !currentValueRef.current
            onValueChange?.(currentValueRef.current)
        }}
        {
        ...handleDrag((_, e) => {

            e.preventDefault()

            if (!onValueChange) return null

            return {
                onMove: ({ delta }) => {
                    onValueChange?.(delta.x > 0)
                }
            }
        })
        }
    >
        <input type="hidden" checked={value} readOnly name={name} onInvalid={e => {

            console.log("TODO INVALID !", e)
        }} />
        <div {...className('thumb')} />
    </div>;
};