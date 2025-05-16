import classNameModule from '@ui/core/classname';
import styles from './Indent.module.scss';
import { SizeVariant } from '@ui/core/types';
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