import classNameModule from '@ui/core/classname';
import styles from './VStack.module.scss';
const className = classNameModule(styles)

type VStackProps = {
    children?: React.ReactNode
    gap?: number | string
    align?: 'start' | 'center' | 'end'
    justify?: 'start' | 'center' | 'end'
    flex?: number
}

export const VStack = ({ children, gap, align, justify, flex }: VStackProps) => {
    return <div {...className('VStack')}
        style={{
            '--gap': typeof gap === 'number' ? `${gap}px` : gap,
            alignItems: align,
            justifyContent: justify,
            flex,
        } as React.CSSProperties}>
        {children}
    </div>;
};