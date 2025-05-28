import classNameModule from '../../core/classname';
import styles from './Checkbox.module.scss';
import { CheckIcon } from 'lucide-react';
import { SizeVariant, ThemeVariant } from '../../core/types';
const className = classNameModule(styles)


type CheckboxProps = {
    value?: boolean
    onValueChange?: (value: boolean) => void
    theme?: ThemeVariant
    variant?: 'outline' | 'subtle' | 'solid'
    disabled?: boolean
    size?: SizeVariant
    name?: string
}

export const Checkbox = ({ value, onValueChange, theme = 'default', variant = 'solid', disabled = false, size = 'md', name }: CheckboxProps) => {
    return <div
        role='checkbox'
        aria-checked={value}
        aria-disabled={disabled}
        onPointerDown={e => e.preventDefault()}
        tabIndex={0}
        {...className('Checkbox', {
            checked: Boolean(value), disabled, size
        }, `:${variant}-${theme}`)} onClick={() => {
            if (disabled) return;
            onValueChange?.(!value)
        }}>
        <input type="hidden" readOnly checked={Boolean(value)} name={name} onInvalid={e => {

            console.log("TODO INVALID !", e)
        }} />
        <CheckIcon strokeWidth={3} />
    </div>;
};