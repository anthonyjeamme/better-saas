'use client'

import classNameModule from '@ui/core/classname';
import styles from './FileExplorer.module.scss';
import { Button } from '@ui/primitives';
import { useState } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { Indent } from '@ui/display/Indent/Indent';
import { VStack } from '@ui/layout';
const className = classNameModule(styles)

type FileExplorerProps = {
    content: any[]
}

export const FileExplorer = ({ content }: FileExplorerProps) => {
    return <div {...className('FileExplorer')}>

        {content.map((item) => {
            return <Item item={item} key={item.name} />
        })}

    </div>;
};


const Item = ({ item }: { item: any }) => {
    if (item.type === 'folder') {
        return <Folder {...item} key={item.name} />
    }
    return <File {...item} key={item.name} />
}

type FolderProps = {
    name: string
    children: any[]
}
export const Folder = ({ name, children }: FolderProps) => {
    const [isOpen, setIsOpen] = useState(false)
    return <div {...className('Folder')}>
        <Button size='sm' onClick={() => setIsOpen(!isOpen)}>
            <ChevronDownIcon size={12} style={{ transform: isOpen ? 'rotate(-180deg)' : 'rotate(0deg)' }} />
            <span>{name}</span>
        </Button>
        <Indent size='lg'>
            <VStack>
                {isOpen && children.map((item) => {
                    return <Item item={item} key={item.name} />
                })}
            </VStack>
        </Indent>
    </div>
}

type FileProps = {
    name: string
}
export const File = ({ name }: FileProps) => {
    return <Button size='sm'>
        {name}
    </Button>
}