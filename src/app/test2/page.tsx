'use client'

import { useState } from 'react';

// import { Box } from '@ui/display/Box';
import { Layers } from '@ui/display/Layers';
// import { Container } from '@ui/display/Container';
import { ItemData } from '@ui/display/Layers/Layers.types';

// import classNameModule from '@ui/core/classname';
// import styles from './page.module.scss';
import { Fullscreen, Sidebar } from '@ui/layout';
import { ComponentIcon, FileIcon, FolderOpenIcon, MoonIcon, SearchIcon, SunIcon } from 'lucide-react';
import { FolderClosedIcon } from 'lucide-react';
import { useTheme } from '@ui/hooks/useTheme';
import { Button } from '@ui/primitives/Button';
import { Separator } from '@ui/primitives/Separator';


export default function Page() {
    const [items, setItems] = useState<ItemData[]>([
        {
            id: '1',
            children: [{
                id: '5',
                type: 'item',
                name: 'Youtube',
                iconName: 'file'
            },
            ],
            type: 'folder',
            name: 'Desktop',
            iconName: 'folder'
        },
        {
            id: '6',
            children: [{
                id: '7',
                type: 'item',
                name: 'Youtube',
                iconName: 'file'
            }],
            type: 'folder',
            name: 'Tablet',
            iconName: 'component'
        },
        {
            id: '2',
            children: [
                {
                    id: '3',
                    type: 'item',
                    name: 'Search',
                    iconName: 'search'
                },
                {
                    id: '4',
                    type: 'item',
                    name: 'Settings',
                    iconName: 'file'
                }
            ],
            type: 'folder',
            name: 'Mobile',
            iconName: 'folder'
        },
        {
            id: '8',
            type: 'item',
            name: 'Coucou',
            iconName: 'file'
        }
    ])

    const [selectedItemId, setSelectedItemId] = useState<string | null>(null)

    const theme = useTheme()

    return <Fullscreen>
        <Sidebar position='left' absolute resizable width={300} padding='sm'>
            <Button
                shape='square'
                variant='ghost'
                size='sm'
                onClick={() => {
                    theme.toggle()
                }}>
                {theme.value === "dark" ?
                    <MoonIcon size={18} /> :
                    <SunIcon size={18} />}
            </Button>
            <Separator />
            <Layers
                items={items}
                onItemsChange={setItems}
                selectedItemId={selectedItemId}
                onSelectItem={setSelectedItemId}
                renderIcon={(iconName, { isOpen, isSelected }) => {

                    const color = isSelected ? undefined : 'var(--primary)'

                    if (iconName === 'folder') {
                        return isOpen ?
                            <FolderOpenIcon color={color} size={15} /> :
                            <FolderClosedIcon color={color} size={15} />
                    }
                    if (iconName === "component") return <ComponentIcon color={color} size={15} />
                    if (iconName === "search") return <SearchIcon size={15} opacity={isSelected ? 1 : 0.5} />

                    return <FileIcon opacity={isSelected ? 1 : 0.5} size={15} />
                }}
            />
        </Sidebar>
    </Fullscreen>
};
