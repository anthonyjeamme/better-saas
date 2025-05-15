'use client'

import classNameModule from '@ui/core/classname';
import styles from './page.module.scss';

import { Container } from '@ui/display/Container/Container';
import { Box } from '@ui/display/Box/Box';
import { useState } from 'react';
import { For } from '@ui/layout/For/For';
import { DndProvider, useDndContext } from './DndContext';
import { useDropzone } from '@ui/hooks/useDropzone/useDropzone';
import { VStack } from '@ui/layout';
const className = classNameModule(styles)

type ItemData = {
    id: string
    label: string
    folder: string | null
}

export default function Page() {

    const [items, setItems] = useState<ItemData[]>([
        {
            id: '1',
            label: 'Item 1',
            folder: 'A'
        },
        {
            id: '2',
            label: 'Item 2',
            folder: 'A'
        },
        {
            id: '3',
            label: 'Item 3',
            folder: 'B'
        },
        {
            id: '4',
            label: 'Item 4',
            folder: 'C'
        },


    ])

    return <div {...className('Page')}>
        <DndProvider>
            <Container vMargin='xl'>

                <Folder id='A' handleDropItem={handleDropItem}>
                    <For each={items.filter(item => item.folder === 'A')}>
                        {item => <Item item={item} />}
                    </For>
                </Folder>

                <Folder id='B' handleDropItem={handleDropItem}>
                    <For each={items.filter(item => item.folder === 'B')}>
                        {item => <Item item={item} />}
                    </For>
                </Folder>

                <Folder id='C' handleDropItem={handleDropItem}>
                    <For each={items.filter(item => item.folder === 'C')}>
                        {item => <Item item={item} />}
                    </For>
                </Folder>



            </Container>
        </DndProvider>
    </div>;

    function handleDropItem(item_id: string, folder_id: string) {
        setItems(items => items.map(item => item.id === item_id ? { ...item, folder: folder_id } : item))
    }
};


const Folder = ({ children, id, handleDropItem }: { children: React.ReactNode, id: string, handleDropItem: (item_id: string, folder_id: string) => void }) => {


    // const { draggingData } = useDndContext()

    const dropzone = useDropzone(e => {
        try {

            const data = JSON.parse(e.dataTransfer.getData('item'))
            handleDropItem(data.id, id)

        } catch { }
    })


    return <div
        {...className('Folder', {
            // 'isDraggingOver': dropzone.isDraggingOver && draggingData?.folder != id
        })}
        {...dropzone.attrs}
    >
        <VStack gap={10}>
            {children}
        </VStack>
    </div>
}

type ItemProps = {
    item: ItemData
}
const Item = ({ item }: ItemProps) => {

    const { setDraggingData } = useDndContext()

    return <div draggable
        onDragStart={e => {
            e.dataTransfer.setData('item', JSON.stringify(item))
            setDraggingData(item)
        }}

        onDragEnd={() => {
            setDraggingData(null)
        }}
    >
        <Box variant='outline'>{item.label}</Box>
    </div>
}

