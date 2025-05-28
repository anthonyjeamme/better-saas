import { SizeVariant } from '../../core/types';

import classNameModule from '../../core/classname';
import styles from './HStack.module.scss';
const className = classNameModule(styles)

type HStackProps = {
    children?: React.ReactNode
    gap?: number | string
    align?: 'start' | 'center' | 'end'
    justify?: 'start' | 'center' | 'end' | 'space-between'
    vMargin?: SizeVariant | 'none'
    flex?: number,
    position?: 'relative' | 'absolute' | 'fixed' | 'sticky',
    top?: number,
    right?: number,
    bottom?: number,
    left?: number,
    inset?: number,
    zIndex?: number
}

export const HStack = ({ children, gap, align, justify, vMargin = 'none', flex, position, top, right, bottom, left, inset, zIndex }: HStackProps) => {
    return <div
        {...className('HStack', `:vMargin-${vMargin}`)}
        style={{
            '--gap': typeof gap === 'number' ? `${gap}px` : gap,
            alignItems: align,
            justifyContent: justify,
            flex,
            position,
            top,
            right,
            bottom,
            left,
            inset,
            zIndex
        } as React.CSSProperties}>
        {children}
    </div>;
};