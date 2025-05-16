import React, { Fragment } from 'react';
import { ChevronRightIcon } from 'lucide-react';

import { SizeVariant } from '@ui/core/types';

import classNameModule from '@ui/core/classname';
import styles from './Breadcrumb.module.scss';
const className = classNameModule(styles)

type BreadcrumbProps = {
    children?: React.ReactNode
    size?: SizeVariant
    separator?: React.ReactNode
}

export const Breadcrumb = ({ children, size = 'md', separator }: BreadcrumbProps) => {

    const crumbs = React.Children.toArray(children)

    return <div {...className('Breadcrumb', { size })}>{
        crumbs.map((crumb, index) => {
            return <Fragment key={index}>
                {index > 0 && (separator ?? <ChevronRightIcon size={14} />)}
                {crumb}
            </Fragment>
        })
    }</div>;
};