import classNameModule from '@ui/core/classname';
import styles from './Checkbox.module.scss';
import { CheckIcon } from 'lucide-react';
import { SizeVariant, ThemeVariant } from '@ui/core/types';
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
        style={{
            '--color': `var(--${theme})`,
            '--color-hover': `var(--${theme}-hover)`,
            '--background-subtle': `var(--subtle-${theme}-background)`,
            '--background-subtle-hover': `var(--subtle-${theme}-background-hover)`,
            '--border-subtle': `var(--subtle-${theme}-border)`,
            '--border-subtle-hover': `var(--subtle-${theme}-border-hover)`,
            '--text-over-subtle': `var(--${theme}-text-over-subtle)`,
            '--text-over': `var(--${theme}-text-over)`,
            '--color-subtle-hover': `var(--subtle-${theme}-hover)`,
        } as React.CSSProperties}
        {...className('Checkbox', {
            checked: Boolean(value), theme, variant, disabled, size
        })} onClick={() => {
            if (disabled) return;
            onValueChange?.(!value)
        }}>
        <input type="hidden" readOnly checked={Boolean(value)} name={name} onInvalid={e => {

            console.log("TODO INVALID !", e)
        }} />
        <CheckIcon strokeWidth={3} />
    </div>;
};