import classNameModule from '@ui/core/classname';
import styles from './Tag.module.scss';
const className = classNameModule(styles)

type TagProps = {
    children: React.ReactNode
}

export const Tag = ({ children }: TagProps) => {
    return <div {...className('Tag')}>{children}</div>;
};