import { useState } from 'react';
import { ChevronRightIcon } from 'lucide-react';

import classNameModule from '../../core/classname';
import styles from './Tree.module.scss';
const className = classNameModule(styles)

type TreeItemNode = {
    label: React.ReactNode
    children?: TreeItemNode[]
    onClick?: () => void

}

type TreeProps = {
    content: TreeItemNode[]
}

export const Tree = ({ content }: TreeProps) => {
    return <div {...className('Tree')}>
        {content.map((item, index) => (
            <TreeItem key={index} item={item} />
        ))}
    </div>;
};

type TreeItemProps = {
    item: TreeItemNode
}

const TreeItem = ({ item }: TreeItemProps) => {

    const [isOpen, setIsOpen] = useState(false)

    const hasChildren = Boolean(item.children)

    return <div {...className('TreeItem', { isOpen })}>
        <button onClick={() => {
            if (hasChildren) {
                setIsOpen(!isOpen)
            }
            item.onClick?.()
        }}>
            {
                hasChildren && (
                    <ChevronRightIcon size={15} {...className('chevron')} />
                )
            }
            <span {...className('label')}>{item.label}</span>
        </button>


        {isOpen && item.children && (
            <div {...className('children')}>
                {item.children.map((child, index) => (
                    <TreeItem key={index} item={child} />
                ))}
            </div>
        )}
    </div>;
};


