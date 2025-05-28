import { SizeVariant } from '../../core/types';
import classNameModule from '../../core/classname';
import styles from './VStack.module.scss';
const className = classNameModule(styles)

type VStackProps = {
    children?: React.ReactNode
    gap?: number | string
    align?: 'start' | 'center' | 'end'
    justify?: 'start' | 'center' | 'end'
    flex?: number
    vMargin?: SizeVariant | 'none'
}

export const VStack = ({ children, gap, align, justify, flex, vMargin = 'none' }: VStackProps) => {
    return <div {...className('VStack', `:vMargin-${vMargin}`)}
        style={{
            '--gap': typeof gap === 'number' ? `${gap}px` : gap,
            alignItems: align,
            justifyContent: justify,
            flex,
        } as React.CSSProperties}>
        {children}
    </div>;
};