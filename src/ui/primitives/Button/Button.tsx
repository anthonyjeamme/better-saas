'use client'

import { ExtendedSizeVariant, ThemeVariant, UIVariant } from '../../core/types';

import { useRef, useState } from 'react';
import { Spinner } from '../Spinner/Spinner';

import classNameModule from '../../core/classname';
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
            {...className('Button', { size, shape, fullWidth }, `:${variant}-${theme}-hoverable`, classNameProp ? `:${classNameProp}` : '')}
            {...props}
            style={{
                '--height': `var(--size-${size})`,
                '--padding-h': `var(--spacing-${size})`,
                '--font-size': `var(--font-size-${size})`,
            } as React.CSSProperties}
            onClick={async (e) => {
                if (!onClick) return
                const buttonElement = buttonRef.current
                if (!buttonElement) return
                const offsetWidth = buttonElement.offsetWidth
                const widthProperty = buttonElement.style.width
                buttonElement.style.width = `${offsetWidth}px`
                setIsLoading(true)
                await onClick(e)
                setIsLoading(false)

                requestAnimationFrame(() => {
                    buttonElement.style.width = widthProperty
                })
            }}
        >
            {isLoading && loading ? <span style={{ margin: 'auto', display: 'flex', }}><Spinner /></span> :
                typeof children === 'function' ? children({ isLoading }) : children
            }
        </button >
    );
};
