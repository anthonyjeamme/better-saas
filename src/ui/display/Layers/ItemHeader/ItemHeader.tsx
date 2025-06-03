import { useRef, useState } from 'react';
import { ChevronRightIcon, EllipsisIcon } from 'lucide-react';

import { useStateRef } from '@ui/hooks/useStateRef';
import { useDndContext } from '@ui/contexts/DndContext/DndContext';

import { useLayersContext } from '../Layers.context';

import classNameModule from '@ui/core/classname';
import styles from './ItemHeader.module.scss';
import { Dropdown } from '@ui/display/Dropdown';
import { Button } from '@ui/primitives';
const className = classNameModule(styles)

type ItemHeaderProps = {
    indent: number
    onCollapse?: () => void
    isOpen?: boolean
    canDropIn?: boolean
    onDrop?: (itemId: string, position: 'top' | 'bottom' | 'in') => void
    dropAfterInside?: boolean
    canDrop?: (position: 'top' | 'bottom' | 'in') => boolean
    item: {
        id: string
        name: string,
        label?: string
        iconName?: string
    }
}


const POSITION_OFFSET = 5

export const ItemHeader = ({
    indent, onCollapse,
    isOpen = false,
    canDropIn,
    onDrop,
    dropAfterInside,
    canDrop,
    item: { id, name, label, iconName }
}: ItemHeaderProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const [isDraggingOver, setIsDraggingOver] = useStateRef(false)
    const [dragPosition, setDragPosition] = useState<'top' | 'bottom' | null>(null)

    const dndContext = useDndContext<{ id: string }>()


    const { updateItem, selectedItemId, onSelectItem, renderIcon } = useLayersContext()

    const isSelected = selectedItemId === id

    const icon = iconName ? renderIcon(iconName, {
        isOpen,
        isSelected
    }) : null

    return <div
        data-id={id}
        data-dropzone={canDropIn}
        {...className('ItemHeader', { isSelected, isDraggingOver, dragPosition, dropAfterInside }, isSelected ? `:solid-primary` : undefined)}
        style={{
            '--indent': indent
        } as React.CSSProperties}
        onClick={() => { onSelectItem?.(id) }}

        {...dndContext.draggableHandler({ id }, !isEditing)}
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
        <span {...className('name')} onDoubleClick={() => setIsEditing(true)}>
            {isEditing ?
                <input
                    type="text"
                    spellCheck={false}
                    autoFocus
                    defaultValue={name}
                    onChange={(e) => updateItem(id, { name: e.target.value })}
                    onBlur={() => setIsEditing(false)}
                    onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === 'Escape') setIsEditing(false)
                    }}
                /> :
                name
            }
        </span>
        {!isEditing && label && (<span {...className('labels')}>{label}</span>)}


        <SettingsButton />
    </div>
}



const SettingsButton = () => {

    const [isOpen, setIsOpen] = useState(false)
    const rootRef = useRef<HTMLDivElement>(null)

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
                    <Button size='sm' variant='ghost' onClick={() => setIsOpen(false)}>Open</Button>
                    <Button size='sm' variant='ghost' onClick={() => setIsOpen(false)}>Close</Button>
                </Dropdown>
            )
        }
    </div>
}