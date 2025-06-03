import { useState } from 'react';

import { DndContextProvider, useDndContext } from '@ui/contexts/DndContext/DndContext';

import { ItemHeader } from './ItemHeader/ItemHeader';
import { FileItemData, FolderItemData, ItemData } from './Layers.types';
import { LayersContextProvider, useLayersContext } from './Layers.context';


import classNameModule from '@ui/core/classname';
import styles from './Layers.module.scss';
const className = classNameModule(styles)

type LayersProps = {
    items: ItemData[]
    onItemsChange: (items: ItemData[]) => void
    selectedItemId?: string | null
    onSelectItem?: (id: string | null) => void
    renderIcon: (iconName: string, state: {
        isOpen: boolean,
        isSelected: boolean,
    }) => React.ReactNode
}

export const Layers = (props: LayersProps) => {
    return <DndContextProvider>
        <LayersContextProvider
            items={props.items}
            onItemsChange={props.onItemsChange}
            onSelectItem={props.onSelectItem}
            selectedItemId={props.selectedItemId}
            renderIcon={props.renderIcon}
        >
            <LayersContent />
        </LayersContextProvider>
    </DndContextProvider>
}

export const LayersContent = () => {
    const { data } = useLayersContext()
    return <div {...className('Layers')}>
        {
            (data.tree["root"] || []).map((itemId, index) => {
                const item = data.flatItems.find(i => i.id === itemId)
                if (!item) return null
                return <Item
                    key={item.id}
                    itemId={item.id}
                    index={index}
                />
            })
        }
    </div>
};


type ItemProps = {
    itemId: string
    indent?: number
    index: number
}


const Item = ({ itemId, indent = 0, index }: ItemProps) => {
    const { data } = useLayersContext()
    const item = data.flatItems.find(i => i.id === itemId)

    if (!item) return null

    if (item.type === 'item')
        return <FileItem itemId={itemId} indent={indent} index={index} />
    return <FolderItem itemId={itemId} indent={indent} index={index} />
}

type FileItemProps = {
    itemId: string
    indent?: number
    index: number
}

const FileItem = ({ itemId, indent = 0, index }: FileItemProps) => {
    const { data, moveItem, isDescendantOf } = useLayersContext()
    const item = data.flatItems.find(i => i.id === itemId) as FileItemData
    const dndContext = useDndContext<{ id: string }>()

    if (!item) return null

    return <div {...className('FileItem')} style={{
        '--indent': indent
    } as React.CSSProperties}>
        <ItemHeader
            item={item}
            indent={indent}
            canDrop={() => {
                const payload = dndContext.getDraggingPayload()
                if (!payload) return false
                if (payload?.id === item.id) return false
                if (isDescendantOf(item.id, payload.id)) return false

                return true
            }}
            onDrop={(itemId, position) => {
                const targetIndex = index + (position === 'top' ? 0 : 1)

                let parentKey = "root"
                for (const [key, children] of Object.entries(data.tree)) {
                    if (children.includes(item.id)) {
                        parentKey = key
                        break
                    }
                }

                moveItem(itemId, parentKey, targetIndex)
            }}
        />
    </div>
}

type FolderItemProps = {
    itemId: string
    indent?: number
    index: number
}

const FolderItem = ({ itemId, indent = 0, index }: FolderItemProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const { data, moveItem, isDescendantOf } = useLayersContext()
    const item = data.flatItems.find(i => i.id === itemId) as FolderItemData
    const dndContext = useDndContext<{ id: string }>()

    if (!item) return null

    return <div {...className('FolderItem')} style={{
        '--indent': indent
    } as React.CSSProperties}>
        <ItemHeader
            item={item}
            indent={indent}
            isOpen={isOpen}
            onCollapse={() => setIsOpen(!isOpen)}
            canDropIn
            canDrop={() => {
                const payload = dndContext.getDraggingPayload()
                if (!payload) return false
                if (payload?.id === item.id) return false
                if (isDescendantOf(item.id, payload.id)) return false

                return true
            }}
            onDrop={(itemId, position) => {
                if ((
                    isOpen && position === "bottom"
                ) || position === "in") {
                    if (itemId === item.id) return
                    moveItem(itemId, item.id, 0)
                } else {
                    const targetIndex = index + (position === 'top' ? 0 : 1)

                    let parentKey = "root"
                    for (const [key, children] of Object.entries(data.tree)) {
                        if (children.includes(item.id)) {
                            parentKey = key
                            break
                        }
                    }
                    moveItem(itemId, parentKey, targetIndex)
                }
            }}
            dropAfterInside={isOpen}
        />
        {
            isOpen && (
                <div {...className('children')}>
                    {
                        (data.tree[item.id] || []).map((childId, index) =>
                            <Item
                                key={childId}
                                itemId={childId}
                                indent={indent + 1}
                                index={index}
                            />
                        )
                    }
                </div>
            )
        }
    </div>
}