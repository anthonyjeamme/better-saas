/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

import { DndContextProvider, useDndContext } from '../../contexts/DndContext';

import { ItemHeader } from './ItemHeader/ItemHeader';
import { LayersContextProvider, useLayersContext } from './Layers.context';
import { CustomMenuItem, FileItemData, FolderItemData } from './Layers.types';
import { LayerElementItem, LayerFolderItem, LayerItem, LayersHook } from './Layers.hook';

import classNameModule from '../../core/classname';
import styles from './Layers.module.scss';
const className = classNameModule(styles)

type LayersProps<TElement = unknown, TFolder = unknown> = {
    renderIcon: (item: LayerItem<TElement, TFolder>, state: {
        isOpen: boolean,
        isSelected: boolean,
    }) => React.ReactNode
    scope: string
    layers: LayersHook<TElement, TFolder>
    folderMenu?: CustomMenuItem<FolderItemData<TElement>>[]
    elementMenu?: CustomMenuItem<FileItemData<TElement>>[]
}

export function Layers<TElement = unknown, TFolder = unknown>(props: LayersProps<TElement, TFolder>) {
    return <DndContextProvider scope={props.scope}>
        <LayersContextProvider
            renderIcon={props.renderIcon}
            layers={props.layers}
            folderMenu={props.folderMenu}
            elementMenu={props.elementMenu}
        >
            <LayersContent />
        </LayersContextProvider>
    </DndContextProvider>
}

export const LayersContent = () => {
    const { layers } = useLayersContext()

    const rootItems = layers.tree.getFolderItems(null)

    return <div {...className('Layers')}>
        {
            rootItems.map((item, index) => {
                return <Item key={item.id} item={item} indent={0} index={index} />
            })
        }
    </div>
};

type ItemProps = {
    item: LayerItem
    indent?: number
    index: number
}

const Item = ({ item, indent = 0, index }: ItemProps) => {

    if (!item) return null

    if (item.type === 'element')
        return <FileItem item={item} indent={indent} index={index} />
    return <FolderItem item={item} indent={indent} index={index} />
}

type FileItemProps = {
    item: LayerElementItem
    indent?: number
    index: number
}

const FileItem = ({ item, indent = 0, index }: FileItemProps) => {
    const { layers } = useLayersContext()
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
                const ancestors = layers.tree.getItemAncestors(item.id)
                if (ancestors.includes(payload.id)) return false
                return true
            }}
            onDrop={(itemId, position) => {
                const ancestors = layers.tree.getItemAncestors(item.id)
                if (ancestors.includes(itemId)) return

                const parentId = layers.tree.getItemParent(item.id)
                if (parentId === item.id) return

                const targetIndex = index + (position === 'top' ? 0 : 1)
                layers.tree.moveItem(itemId, parentId, targetIndex)
            }}
        />
    </div>
}

type FolderItemProps = {
    item: LayerFolderItem
    indent?: number
    index: number
}

const FolderItem = ({ item, indent = 0, index }: FolderItemProps) => {
    const [isOpen, setIsOpen] = useState(indent === 0)
    const { layers } = useLayersContext()
    const dndContext = useDndContext<{ id: string }>()

    const children = layers.tree.getFolderItems(item.id)

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
                if (layers.tree.getItemParent(payload.id) === item.id) return false
                const ancestors = layers.tree.getItemAncestors(item.id)
                if (ancestors.includes(payload.id)) return false

                return true
            }}
            onDrop={(itemId, position) => {
                if (itemId === item.id) return
                const ancestors = layers.tree.getItemAncestors(item.id)
                if (ancestors.includes(itemId)) return
                if (layers.tree.getItemParent(itemId) === item.id) return
                if ((isOpen && position === "bottom") || position === "in") {
                    layers.tree.moveItem(itemId, item.id, 0)
                } else {
                    const parentId = layers.tree.getItemParent(item.id)
                    const targetIndex = index + (position === 'top' ? 0 : 1)
                    layers.tree.moveItem(itemId, parentId, targetIndex)
                }
            }}
            dropAfterInside={isOpen}
        />
        {
            isOpen && (
                <div {...className('children')}>
                    {
                        (children).map((child, index) =>
                            <Item
                                key={child.id}
                                item={child}
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