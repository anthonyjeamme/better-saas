import classNameModule from '@ui/core/classname';
import styles from './HStack.module.scss';
const className = classNameModule(styles)

type HStackProps = {
    children?: React.ReactNode
    gap?: number | string
    align?: 'start' | 'center' | 'end'
    justify?: 'start' | 'center' | 'end' | 'space-between'
    vMargin?: number
    flex?: number
}

export const HStack = ({ children, gap, align, justify, vMargin = 0, flex }: HStackProps) => {
    return <div
        {...className('HStack')}
        style={{
            '--gap': typeof gap === 'number' ? `${gap}px` : gap,
            alignItems: align,
            justifyContent: justify,
            marginTop: vMargin,
            marginBottom: vMargin,
            flex,
        } as React.CSSProperties}>
        {children}
    </div>;
};