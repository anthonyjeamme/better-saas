import { ThemeVariant, UIVariant, StackVariant, SizeVariant, AlignVariant } from '@ui/core/types';

import classNameModule from '@ui/core/classname';
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
}

export const Box = ({
    children,
    padding = 'md',
    theme = 'default', variant = 'plain', radius = 'sm', stack, align, aspectRatio, gap, vMargin = 'none' }: BoxProps) => {
    return <div {...className('Box', { padding, theme, variant, radius, stack, align, vMargin })}
        style={{
            aspectRatio,
            gap
        }}

    >{children}</div>;
};