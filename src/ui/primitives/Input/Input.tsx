import { TextFieldVariantProps, UIPaletteProps, UISizeProps } from '../../_shared/types';

import classNameModule from '@ui/core/classname';
import styles from './Input.module.scss';
import { forwardRef } from 'react';
const className = classNameModule(styles)

type InputProps = {
    startAddon?: React.ReactNode
    endAddon?: React.ReactNode
    startElement?: React.ReactNode
    endElement?: React.ReactNode
    onValueChange?: (value: string) => void
} & UIPaletteProps
    & UISizeProps & TextFieldVariantProps & React.InputHTMLAttributes<HTMLInputElement>

/**
 * 
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(({
    small, medium, large,
    outline, subtle, flushed,
    startAddon, endAddon,
    startElement, endElement,
    onValueChange,
    ...props
}, ref) => {

    return (
        <div {...className('InputContainer')}>

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
                    small, medium, large,
                    outline, subtle, flushed,
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
