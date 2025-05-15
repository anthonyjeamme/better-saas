import classNameModule from '@ui/core/classname';
import styles from './Small.module.scss';
const className = classNameModule(styles)

type SmallProps = {
    children?: React.ReactNode
    uppercase?: boolean
}

export const Small = ({ children, uppercase = false }: SmallProps) => {
    return <span {...className('Small', { uppercase })}>{children}</span>
}