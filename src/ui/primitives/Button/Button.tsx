'use client'

import { ExtendedSizeVariant, ThemeVariant, UIVariant } from '@ui/core/types';

import { useRef, useState } from 'react';
import { Spinner } from '../Spinner/Spinner';

import classNameModule from '@ui/core/classname';
import styles from './Button.module.scss';
const className = classNameModule(styles)

type ButtonProps = {
    children?: React.ReactNode | (({ isLoading }: { isLoading: boolean }) => React.ReactNode)
    size?: ExtendedSizeVariant
    variant?: UIVariant
    theme?: ThemeVariant
    shape?: 'square' | 'circle'
    loading?: boolean
    fullWidth?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

/**
 * 
 */
export function Button({
    children,
    size = 'md',
    variant = 'solid',
    theme = 'default',
    shape,
    loading,
    onClick,
    fullWidth,
    className: classNameProp,
    ...props
}: ButtonProps) {
    const [isLoading, setIsLoading] = useState(false)
    const buttonRef = useRef<HTMLButtonElement>(null)

    return (
        <button
            ref={buttonRef}
            {...className('Button', { size, shape, fullWidth }, `:${variant}-${theme}`, classNameProp ? `:${classNameProp}` : '')}
            {...props}
            style={getButtonStyle(theme, variant, size)}
            onClick={async (e) => {
                if (!onClick) return
                const buttonElement = buttonRef.current
                if (!buttonElement) return
                const offsetWidth = buttonElement.offsetWidth
                const withProperty = buttonElement.style.width
                buttonElement.style.width = `${offsetWidth}px`
                setIsLoading(true)
                await onClick(e)
                setIsLoading(false)
                requestAnimationFrame(() => {
                    buttonElement.style.width = withProperty
                })
            }}
        >
            {isLoading && loading ? <span style={{ margin: 'auto', display: 'flex', }}><Spinner /></span> :
                typeof children === 'function' ? children({ isLoading }) : children
            }
        </button >
    );
};

function getButtonStyle(theme: ThemeVariant, variant: UIVariant, size: ExtendedSizeVariant) {
    const style: Record<string, string> = {}

    style['--font-size'] = `var(--font-size-${size})`

    style['--height'] = `var(--h-${size})`
    return style as React.CSSProperties
}