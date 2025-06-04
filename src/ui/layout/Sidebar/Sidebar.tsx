'use client'

import { useRef } from 'react';
import { useResize } from '../../hooks/useResize';
import { Size } from '../../functions/math';

import classNameModule from '../../core/classname';
import styles from './Sidebar.module.scss';
import { SizeVariant, Theme } from '@ui/core/types';
const className = classNameModule(styles)

type SidebarProps = {
    children?: React.ReactNode
    resizable?: boolean
    position: 'left' | 'right'
    absolute?: boolean
    width?: number
    padding?: SizeVariant | 'none'
    theme?: Theme
}

export const Sidebar = ({ children, position, absolute, resizable, width, padding, theme }: SidebarProps) => {
    const rootRef = useRef<HTMLDivElement>(null)

    return (
        <aside
            {...className('Sidebar', { position, absolute, padding },
                theme ? `:${theme}-theme` : undefined,)}
            ref={rootRef}
            style={{ width }}>
            {children}
            {
                resizable && <Resizer position={position} getRoot={() => rootRef.current}
                />
            }
        </aside>
    );
};


type ResizerProps = {
    position: 'left' | 'right',
    getRoot: () => HTMLDivElement | null
    onResize?: (size: Partial<Size>) => void
}

const Resizer = ({ position, getRoot, onResize }: ResizerProps) => {
    const { handler, isResizing } = useResize(getRoot, {
        axis: 'x',
        anchorPoint: position === 'left' ? 'top-left' : 'top-right',
        minWidth: '50px',
        maxWidth: 'calc(100vw / 3)'
    }, {
        onResizeEnd: onResize
    })

    return <div
        {...className('Resizer', { position, isResizing })}
        {...handler}
    />
}