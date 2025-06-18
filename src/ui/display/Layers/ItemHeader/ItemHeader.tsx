import { useRef, useState } from 'react';
import { ChevronRightIcon, EllipsisIcon, PencilIcon, TrashIcon } from 'lucide-react';

import { useStateRef } from '../../../hooks/useStateRef';
import { useDndContext } from '../../../contexts/DndContext/DndContext';

import { useLayersContext } from '../Layers.context';

import { Dropdown } from '../../../display/Dropdown';
import { Button } from '../../../primitives/Button';
import { LayerItem } from '../Layers.hook';


import classNameModule from '../../../core/classname';
import styles from './ItemHeader.module.scss';
const className = classNameModule(styles)

type ItemHeaderProps = {
    indent: number
    onCollapse?: () => void
    isOpen?: boolean
    canDropIn?: boolean
    onDrop?: (itemId: string, position: 'top' | 'bottom' | 'in') => void
    dropAfterInside?: boolean
    canDrop?: (position: 'top' | 'bottom' | 'in') => boolean
    item: LayerItem
}


const POSITION_OFFSET = 5

export const ItemHeader = ({
    indent, onCollapse,
    isOpen = false,
    canDropIn,
    onDrop,
    dropAfterInside,
    canDrop,
    item
}: ItemHeaderProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const [isDraggingOver, setIsDraggingOver] = useStateRef(false)
    const [dragPosition, setDragPosition] = useState<'top' | 'bottom' | null>(null)

    const [settingsIsOpen, setSettingsIsOpen] = useState(false)

    const dndContext = useDndContext<{ id: string }>()

    const { selectedItemIds, onSelectItems, renderIcon, layers } = useLayersContext()

    const isSelected = selectedItemIds?.includes(item.id) ?? false

    const icon = renderIcon(item, {
        isOpen,
        isSelected
    })

    return <div
        data-id={item.id}
        data-dropzone={canDropIn}
        {...className('ItemHeader', { isSelected, isDraggingOver, dragPosition, dropAfterInside }, isSelected ? `:solid-primary` : undefined)}
        style={{
            '--indent': indent
        } as React.CSSProperties}
        onClick={(e) => {
            if (e.ctrlKey) {


                onSelectItems?.([...selectedItemIds, item.id])

            } else {
                onSelectItems?.([item.id])
            }
        }}

        onContextMenu={(e) => {
            e.preventDefault()
            setSettingsIsOpen(true)
        }}
        {...dndContext.draggableHandler({ id: item.id }, !isEditing && !item.config?.disableDrag)}
        onDragOver={(e) => {
            const clientY = e.clientY
            const rect = e.currentTarget.getBoundingClientRect()
            const deltaTop = clientY - rect.top
            const deltaBottom = (rect.top + rect.height) - clientY

            if (canDropIn) {
                if (deltaTop < POSITION_OFFSET) {
                    if (canDrop && !canDrop?.('top')) {
                        setDragPosition(null)
                        setIsDraggingOver(false)

                    } else {
                        setDragPosition('top')
                        setIsDraggingOver(false)
                    }
                }
                else if (deltaBottom < POSITION_OFFSET) {
                    if (canDrop && !canDrop?.('bottom')) {
                        setDragPosition(null)
                        setIsDraggingOver(false)

                    } else {
                        setDragPosition('bottom')
                        setIsDraggingOver(false)
                    }
                } else {

                    if (canDrop && !canDrop?.('in')) {
                        setDragPosition(null)
                        setIsDraggingOver(false)

                    } else {
                        setDragPosition(null)
                        if (canDropIn) setIsDraggingOver(true)
                    }

                }
            } else {
                const center = rect.top + rect.height / 2
                if (clientY < center) {
                    if (canDrop && !canDrop?.('top')) {
                        setDragPosition(null)
                        setIsDraggingOver(false)

                    } else {
                        setDragPosition('top')
                    }
                } else {

                    if (canDrop && !canDrop?.('bottom')) {
                        setDragPosition(null)
                        setIsDraggingOver(false)

                    } else {
                        setDragPosition('bottom')
                    }
                }
            }
            e.preventDefault()
        }}
        onDragLeave={(e) => {
            const target = e.currentTarget;
            const relatedTarget = e.relatedTarget as HTMLElement;
            if (!target || !relatedTarget) {
                setIsDraggingOver(false);
                setDragPosition(null)
                return;
            }

            const closestDropzone = relatedTarget.closest("[data-dropzone]");
            if (closestDropzone !== target) {
                setIsDraggingOver(false);
                setDragPosition(null)
            }
        }}
        onDrop={(e) => {
            e.preventDefault()

            const clientY = e.clientY
            const rect = e.currentTarget.getBoundingClientRect()
            const deltaTop = clientY - rect.top
            const deltaBottom = (rect.top + rect.height) - clientY

            const item = dndContext.getData(e)

            if (item) {


                if (canDropIn) {
                    if (deltaTop < POSITION_OFFSET) {
                        onDrop?.(item.id, 'top')
                    }
                    else if (deltaBottom < POSITION_OFFSET) {
                        onDrop?.(item.id, 'bottom')
                    } else {
                        onDrop?.(item.id, 'in')
                    }
                } else {

                    const center = rect.top + rect.height / 2
                    if (clientY < center) {
                        onDrop?.(item.id, 'top')
                    } else {
                        onDrop?.(item.id, 'bottom')
                    }
                }
            }

            setIsDraggingOver(false)
            setDragPosition(null)
        }}
    >
        {
            onCollapse ?
                <button {...className('collapse', { isOpen })}
                    onClick={(e) => {
                        e.stopPropagation()
                        onCollapse?.()
                    }}>
                    <ChevronRightIcon size={11} />
                </button> :
                <span {...className('collapseSpace')}></span>
        }

        {
            icon ?
                <span {...className('icon')}>
                    {icon}
                </span>
                :
                <span {...className('collapseSpace')}></span>
        }
        <span {...className('name')} onDoubleClick={() => {

            if (item.config?.disableRename) return
            setIsEditing(true)
        }}>
            {isEditing ?
                <input
                    type="text"
                    spellCheck={false}
                    autoFocus
                    onFocus={e => {
                        e.target.select()
                    }}
                    defaultValue={item.name}
                    onChange={(e) => {
                        layers.tree.updateItem(item.id, { name: e.target.value })
                    }}
                    onBlur={() => setIsEditing(false)}
                    onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === 'Escape') setIsEditing(false)
                    }}
                /> :
                item.name
            }
        </span>

        <SettingsButton
            item={item}
            isOpen={settingsIsOpen} setIsOpen={setSettingsIsOpen}
            handleRename={() => {
                setIsEditing(true)
            }}
        />
    </div>
}

type SettingsButtonProps = {
    item: LayerItem
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    handleRename: () => void
}

const SettingsButton = ({ item, isOpen, setIsOpen, handleRename }: SettingsButtonProps) => {
    const rootRef = useRef<HTMLDivElement>(null)
    const { layers, folderMenu, elementMenu } = useLayersContext()

    const menu = (item.type === "folder" ? folderMenu : elementMenu) ?? []


    const hasItems = !item.config?.disableRemove || !item.config?.disableRename || menu.length > 0


    if (!hasItems) return null


    return <div {...className('SettingsButton', { isOpen })} ref={rootRef} onClick={e => {
        e.stopPropagation()
    }}>
        <button {...className('settings')} onClick={() => setIsOpen(!isOpen)}>
            <EllipsisIcon size={14} />
        </button>
        {
            isOpen && (
                <Dropdown parentRef={rootRef} position={{
                }}

                    onClose={() => setIsOpen(false)}
                >
                    {
                        (menu ?? []).map(menuItem => (
                            <Button key={menuItem.label} size='sm' variant='ghost'
                                onClick={() => {
                                    menuItem.onClick(item as any, () => setIsOpen(false))
                                }}
                            >
                                {menuItem.icon} {menuItem.label}
                            </Button>
                        ))
                    }
                    {
                        !item.config?.disableRename && (
                            <Button size='sm' variant='ghost' onClick={() => {
                                handleRename()
                                setIsOpen(false)
                            }}>
                                <PencilIcon size={15} />
                                Renommer
                            </Button>
                        )
                    }
                    {
                        !item.config?.disableRemove && (
                            <Button size='sm' variant='ghost' onClick={() => {
                                layers.tree.removeItem(item.id)
                            }}>
                                <TrashIcon size={15} />
                                Supprimer
                            </Button>
                        )
                    }
                </Dropdown>
            )
        }
    </div>
}