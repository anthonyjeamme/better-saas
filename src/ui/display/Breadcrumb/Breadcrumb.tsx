import React, { Fragment } from 'react';
import { ChevronRightIcon } from 'lucide-react';

import { SizeVariant } from '@ui/core/types';

import classNameModule from '@ui/core/classname';
import styles from './Breadcrumb.module.scss';
const className = classNameModule(styles)

type BreadcrumbProps = {
    children?: React.ReactNode
    size?: SizeVariant
    icon?: React.ReactNode
}

export const Breadcrumb = ({ children, size = 'md', icon }: BreadcrumbProps) => {

    const crumbs = React.Children.toArray(children)

    return <div {...className('Breadcrumb', { size })}>{
        crumbs.map((crumb, index) => {
            return <Fragment key={index}>
                {index > 0 && (icon ?? <ChevronRightIcon size={14} />)}
                {crumb}
            </Fragment>
        })
    }</div>;
};