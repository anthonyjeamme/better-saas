import classNameModule from '@ui/core/classname';
import styles from './Badge.module.scss';
import { UIVariant } from '@ui/core/types';
const className = classNameModule(styles)

type BadgeProps = {
    children?: React.ReactNode
    variant?: UIVariant
}

export const Badge = ({ children, variant = 'surface' }: BadgeProps) => {
    return <div {...className('Badge', { variant })}>{children}</div>;
};