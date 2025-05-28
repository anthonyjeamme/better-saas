import classNameModule from '../../core/classname';
import styles from './Container.module.scss';
import { SizeVariant } from '../../core/types';
const className = classNameModule(styles)

type ContainerProps = {
    size?: SizeVariant
    children?: React.ReactNode
    vMargin?: SizeVariant | 'none'
}

export const Container = ({ size = 'md', children, vMargin = 'none' }: ContainerProps) => {
    return <div {...className('Container', { size, vMargin })}>{children}</div>;
};