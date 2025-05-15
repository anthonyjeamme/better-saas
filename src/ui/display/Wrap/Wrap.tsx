import classNameModule from '@ui/core/classname';
import styles from './Wrap.module.scss';
const className = classNameModule(styles)

type WrapProps = {
    children?: React.ReactNode
    gap?: number
    vMargin?: number
}

export const Wrap = ({ children, gap = 10, vMargin = 0 }: WrapProps) => {
    return <div {...className('Wrap')} style={{ '--gap': `${gap}px`, marginTop: vMargin, marginBottom: vMargin } as React.CSSProperties}>{children}</div>
}
