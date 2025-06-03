import { createContext, useContext, useState } from "react"

import { ItemData, FlatData } from "./Layers.types"
import { flatItems, rebuildItems } from "./Layers.utils"
import { arrayInsert, arrayRemove, arrayMove } from "@ui/functions/array"

type LayersContextType = {
    data: FlatData
    setData: (data: FlatData) => void
    moveItem: (itemId: string, targetFolderId: string, index: number) => void
    updateItem: (itemId: string, updates: Partial<ItemData>) => void
    isDescendantOf: (itemId: string, potentialAncestorId: string) => boolean
    onSelectItem?: (id: string) => void
    selectedItemId?: string | null,
    renderIcon: (iconName: string, state: {
        isOpen: boolean,
        isSelected: boolean,
    }) => React.ReactNode
}

const layersContext = createContext<LayersContextType | null>(null)

export function useLayersContext() {
    const context = useContext(layersContext)
    if (!context) throw new Error('useLayersContext must be used within a LayersProvider')

    return context
}


type LayersContextProviderProps = {
    items: ItemData[]
    onItemsChange: (items: ItemData[]) => void
    children: React.ReactNode
    onSelectItem?: (id: string) => void
    selectedItemId?: string | null
    renderIcon: (iconName: string, state: {
        isOpen: boolean,
        isSelected: boolean,
    }) => React.ReactNode
}

export function LayersContextProvider({ children, onSelectItem, selectedItemId, onItemsChange, items, renderIcon }: LayersContextProviderProps) {
    const [data, setData] = useState<FlatData>(flatItems(items))

    const handleDataChange = (newData: FlatData) => {
        setData(newData)
        const rebuiltItems = rebuildItems(newData)
        onItemsChange(rebuiltItems)
    }

    return <layersContext.Provider value={{
        data, setData: handleDataChange,
        onSelectItem, selectedItemId,
        moveItem,
        updateItem,
        isDescendantOf,
        renderIcon
    }}>
        {children}
    </layersContext.Provider>

    function isDescendantOf(itemId: string, potentialAncestorId: string) {
        const children = data.tree[potentialAncestorId] || []

        if (children.includes(itemId)) return true

        for (const childId of children) {
            if (isDescendantOf(itemId, childId)) return true
        }

        return false
    }

    function moveItem(itemId: string, targetFolderId: string, index: number) {

        if (itemId === targetFolderId) return

        if (targetFolderId !== "root" && isDescendantOf(targetFolderId, itemId))
            return

        const newTree = { ...data.tree }

        let sourceKey = null
        let sourceIndex = -1

        for (const [key, children] of Object.entries(newTree)) {
            const itemIndex = children.indexOf(itemId)
            if (itemIndex !== -1) {
                sourceKey = key
                sourceIndex = itemIndex
                break
            }
        }

        if (sourceKey === null) return

        if (sourceKey === targetFolderId) {
            newTree[targetFolderId] = arrayMove(newTree[targetFolderId], sourceIndex, index)
        } else {
            newTree[sourceKey] = arrayRemove(newTree[sourceKey], sourceIndex)

            if (!newTree[targetFolderId]) {
                newTree[targetFolderId] = []
            }
            newTree[targetFolderId] = arrayInsert(newTree[targetFolderId], itemId, index)
        }

        handleDataChange({ ...data, tree: newTree })

    }

    function updateItem(itemId: string, updates: Partial<ItemData>) {
        const newFlatItems = data.flatItems.map(item =>
            item.id === itemId ? { ...item, ...updates } as typeof item : item
        )
        handleDataChange({ ...data, flatItems: newFlatItems })
    }
}