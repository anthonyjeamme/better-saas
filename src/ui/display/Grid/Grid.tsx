import { SizeVariant } from '../../core/types';

import classNameModule from '../../core/classname';
import styles from './Grid.module.scss';
const className = classNameModule(styles)

type GridProps = {
    children?: React.ReactNode
    columns?: number
    mobileColumns?: number
    tabletColumns?: number
    desktopColumns?: number
    gap?: SizeVariant
    vMargin?: SizeVariant | 'none'
}

export const Grid = ({ children, columns = 3, gap = 'md', mobileColumns, tabletColumns, desktopColumns,
    vMargin = 'none'
}: GridProps) => {
    return <div
        {...className('Grid', { gap }, `:vMargin-${vMargin}`)}
        style={{
            '--columns': columns,
            '--mobile-columns': mobileColumns,
            '--tablet-columns': tabletColumns,
            '--desktop-columns': desktopColumns
        } as React.CSSProperties}>
        {children}
    </div>;
};