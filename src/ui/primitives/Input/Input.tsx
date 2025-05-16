
import classNameModule from '@ui/core/classname';
import styles from './Input.module.scss';
import { forwardRef } from 'react';
import { SizeVariant, TextFieldVariant } from '@ui/core/types';
const className = classNameModule(styles)

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> & {
    startAddon?: React.ReactNode
    endAddon?: React.ReactNode
    startElement?: React.ReactNode
    endElement?: React.ReactNode
    onValueChange?: (value: string) => void

    size?: SizeVariant
    variant?: TextFieldVariant

}

/**
 * 
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(({
    size = 'md',
    variant = 'outline',
    startAddon, endAddon,
    startElement, endElement,
    onValueChange,
    ...props
}, ref) => {

    return (
        <div {...className('InputContainer')}
            style={{
                '--height': `var(--size-${size})`,
                '--padding-h': `var(--spacing-${size})`
            } as React.CSSProperties}
        >
            {
                startElement && (
                    <div {...className('StartElement')}>
                        {startElement}
                    </div>
                )
            }
            {
                startAddon && (
                    <div {...className('StartAddon')}>
                        {startAddon}
                    </div>
                )
            }
            <input
                ref={ref}
                {...className('Input', {
                    variant,
                    withStartAddon: Boolean(startAddon),
                    withEndAddon: Boolean(endAddon),
                })}
                {...props}
                onChange={e => onValueChange?.(e.target.value)}
            />
            {
                endAddon && (
                    <div {...className('EndAddon')}>
                        {endAddon}
                    </div>
                )
            }
            {
                endElement && (
                    <div {...className('EndElement')}>
                        {endElement}
                    </div>
                )
            }
        </div>
    );
});

Input.displayName = 'Input';
