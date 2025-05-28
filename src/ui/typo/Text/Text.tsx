import { ExtendedSizeVariant } from '../../core/types';

import classNameModule from '../../core/classname';
import styles from './Text.module.scss';
const className = classNameModule(styles)

type TextProps = {
    children: React.ReactNode
    size?: ExtendedSizeVariant
    weight?: number
    opacity?: number
    format?: 'uppercase' | 'lowercase' | 'capitalize'
    lineHeight?: number
}

export const Text = ({ children, size = 'md', weight = 400, opacity = 1, format, lineHeight }: TextProps) => {
    return <span
        {...className('Text', { size, format })}
        style={{ fontWeight: weight, opacity, fontSize: `var(--font-size-${size})`, lineHeight }}>
        {children}
    </span>;
};