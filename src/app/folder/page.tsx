'use client'

import { Container } from '@ui/display/Container/Container';
import { Separator } from '@ui/primitives/Separator/Separator';
import { HStack } from '@ui/layout';
import { For } from '@ui/layout/For/For';
import { useList } from '@ui/hooks/useList/useList';

import classNameModule from '@ui/core/classname';
import styles from './page.module.scss';
import { useDropzone } from '@ui/hooks/useDropzone/useDropzone';
const className = classNameModule(styles)

export default function Page() {

    return <div {...className('Page')}>

        <Container size='lg'>
            <Folder name="root">

                <Folder name="A">

                    <Folder name="A.1">
                    </Folder>

                </Folder>
                <Folder name="B">

                </Folder>
            </Folder>
        </Container>

        <Separator />

        <HStack gap={10}>
            <DraggableItem color="blue" />
            <DraggableItem color="green" />
            <DraggableItem color="red" />
            <DraggableItem color="yellow" />
        </HStack>
    </div>;
};



const DraggableItem = ({ color }: { color: string }) => {
    return (
        <div draggable
            onDragStart={e => {
                e.dataTransfer.setData('text/plain', color)
            }}
            style={{
                height: 100,
                width: 100,
                backgroundColor: color
            }}
        />
    )
}

type FolderProps = {
    children?: React.ReactNode
    name: string
}

const Folder = ({ children }: FolderProps) => {

    const list = useList<string>([])
    const dropzone = useDropzone((e) => {
        const data = e.dataTransfer.getData('text/plain')
        list.insert(data, 0)
    })

    return <div
        {...className('Folder', { isDraggingOver: dropzone.isDraggingOver })}
        {...dropzone.attrs}
    >

        <HStack gap={10}>
            <For each={list.items}>
                {item => <div style={{ height: 50, width: 50, background: item }}></div>}
            </For>
        </HStack>

        {children}
    </div>
}



