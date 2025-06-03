import { SizeVariant, ThemeVariant } from '../../core/types';
import classNameModule from '../../core/classname';
import styles from './Radio.module.scss';
const className = classNameModule(styles)

type RadioProps = {
    value?: boolean
    onValueChange?: (value: boolean) => void
    disabled?: boolean
    size?: SizeVariant
    theme?: ThemeVariant
    variant?: 'solid' | 'subtle' | 'outline'
}

export const Radio = ({
    value = false,
    onValueChange,
    disabled,
    size = 'md',
    theme = 'default',
    variant = 'solid'
}: RadioProps) => {
    return <div
        role="radio"
        aria-checked={value}
        aria-disabled={disabled}
        onPointerDown={e => e.preventDefault()}
        tabIndex={0}
        onClick={() => {
            onValueChange?.(!value)
        }}
        {...className('Radio', { size, checked: value, theme, variant })}

        style={{
            '--subtle-border': `var(--subtle-${theme}-border)`,
            '--subtle-border-hover': `var(--subtle-${theme}-border-hover)`,
            '--subtle-background': `var(--subtle-${theme}-background)`,
            '--subtle-background-hover': `var(--subtle-${theme}-background-hover)`,
            '--solid-background': `var(--${theme})`,
            '--solid-background-hover': `var(--${theme}-hover)`,
            '--color': `var(--${theme}-text-over-subtle)`,
            '--contrast-color': `var(--${theme}-contrast-color)`,
        } as React.CSSProperties}

    >
        <div />
    </div>;
};

