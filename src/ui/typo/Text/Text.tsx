import classNameModule from '@ui/core/classname';
import styles from './Text.module.scss';
import { ExtendedSizeVariant } from '@ui/_shared/types';
const className = classNameModule(styles)

type TextProps = {
    children: React.ReactNode
    size?: ExtendedSizeVariant
    weight?: number
    opacity?: number
}

export const Text = ({ children, size = 'md', weight = 400, opacity = 1 }: TextProps) => {
    return <span
        {...className('Text', { size })}
        style={{ fontWeight: weight, opacity, fontSize: `var(--font-size-${size})` }}>
        {children}
    </span>;
};