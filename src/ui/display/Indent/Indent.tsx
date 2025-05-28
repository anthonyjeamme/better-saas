import { SizeVariant } from '../../core/types';

import classNameModule from '../../core/classname';
import styles from './Indent.module.scss';
const className = classNameModule(styles)

type IndentProps = {
    children: React.ReactNode
    size?: SizeVariant
}

export const Indent = ({ children, size = 'md' }: IndentProps) => {
    return <div {...className('Indent', { size })}>
        {children}
    </div>;
};