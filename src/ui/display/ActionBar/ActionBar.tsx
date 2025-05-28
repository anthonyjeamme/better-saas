import classNameModule from '../../core/classname';
import styles from './ActionBar.module.scss';
const className = classNameModule(styles)

type ActionBarProps = {
    children?: React.ReactNode
    position?: {
        vertical?: 'top' | 'center' | 'bottom'
        horizontal?: 'left' | 'center' | 'right'
        type?: 'absolute' | 'fixed' | 'sticky'
    }
}

export const ActionBar = ({ children, position }: ActionBarProps) => {
    return <div {...className('ActionBar', {
        vPosition: position?.vertical ?? 'bottom',
        hPosition: position?.horizontal ?? 'center',
        type: position?.type ?? 'absolute'
    })}>
        {children}
    </div>;
};