import { ThemeVariant, UIVariant, StackVariant, SizeVariant, AlignVariant } from '../../core/types';

import classNameModule from '../../core/classname';
import styles from './Box.module.scss';
const className = classNameModule(styles)

type BoxProps = {
    children?: React.ReactNode
    padding?: SizeVariant | 'none'
    theme?: ThemeVariant
    variant?: UIVariant
    radius?: SizeVariant | 'none'
    stack?: StackVariant
    align?: AlignVariant
    aspectRatio?: number | string
    gap?: number
    vMargin?: SizeVariant | 'none'
    flex?: number,
    justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around',
    position?: 'relative' | 'absolute' | 'fixed' | 'sticky'
}

export const Box = ({
    children,
    padding = 'md',
    theme = 'default',
    variant = 'plain',
    radius = 'sm',
    stack,
    align,
    aspectRatio,
    gap,
    vMargin = 'none',
    flex,
    justify,
    position
}: BoxProps) => {
    return <div
        {...className('Box',
            { padding, radius, stack, align },
            `:vMargin-${vMargin}`,
            `:${variant}-${theme}`,
            stack ? `:stack-${stack}` : ''
        )}
        style={{
            aspectRatio,
            gap,
            flex,
            justifyContent: justify,
            position
        }}
    >{children}</div>;
};