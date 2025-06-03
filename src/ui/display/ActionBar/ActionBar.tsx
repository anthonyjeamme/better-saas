import { Theme } from '../../core/types';
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
    theme?: Theme
}

/**
 * 
 */
export const ActionBar = ({ children, position, theme }: ActionBarProps) => {
    return <div {...className('ActionBar', {
        vPosition: position?.vertical ?? 'bottom',
        hPosition: position?.horizontal ?? 'center',
        type: position?.type ?? 'absolute'
    },
        theme ? `:${theme}-theme` : undefined,
        `:position-${position?.type ?? 'absolute'}`
    )}>
        {children}
    </div>;
};