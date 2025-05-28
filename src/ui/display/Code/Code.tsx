import { SizeVariant } from '../../core/types';
import classNameModule from '../../core/classname';
import styles from './Code.module.scss';
const className = classNameModule(styles)

type CodeProps = {
    children?: React.ReactNode;
    vMargin?: SizeVariant | 'none'
}

export const Code = ({ children, vMargin = 'md' }: CodeProps) => {
    return <code {...className('Code', `:vMargin-${vMargin}`)}>{children}</code>;
};