import { ThemeVariant } from '../../core/types';

import classNameModule from '../../core/classname';
import styles from './Tag.module.scss';
const className = classNameModule(styles)

type TagProps = {
    children: React.ReactNode
    variant?: 'solid' | 'surface' | 'outline' | 'subtle',
    theme?: ThemeVariant
}

export const Tag = ({ children, variant = 'subtle', theme = 'default' }: TagProps) => {
    return <div {...className('Tag', `:${variant}-${theme}`)}>{children}</div>;
};