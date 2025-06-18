/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext } from "react"

import { CustomMenuItem, FileItemData, FolderItemData } from "./Layers.types"
import { LayerItem, LayersHook } from "./Layers.hook"

type LayersContextType = {
    onSelectItems?: (ids: string[]) => void
    selectedItemIds: string[],
    renderIcon: (item: LayerItem, state: {
        isOpen: boolean,
        isSelected: boolean,
    }) => React.ReactNode
    layers: LayersHook
    folderMenu?: CustomMenuItem<FolderItemData<any>>[]
    elementMenu?: CustomMenuItem<FileItemData<any>>[]
}

const layersContext = createContext<LayersContextType | null>(null)

export function useLayersContext() {
    const context = useContext(layersContext)
    if (!context) throw new Error('useLayersContext must be used within a LayersProvider')

    return context
}

type LayersContextProviderProps = {
    children: React.ReactNode
    renderIcon: (item: LayerItem, state: {
        isOpen: boolean,
        isSelected: boolean,
    }) => React.ReactNode
    layers: LayersHook<any, any>
    folderMenu?: CustomMenuItem<FolderItemData<any>>[]
    elementMenu?: CustomMenuItem<FileItemData<any>>[]
}

export function LayersContextProvider({
    children, renderIcon, layers, folderMenu, elementMenu
}: LayersContextProviderProps) {


    return <layersContext.Provider value={{
        selectedItemIds: layers.activeLayerIds,
        onSelectItems: layers.setActiveLayerIds,
        renderIcon,
        layers,
        folderMenu,
        elementMenu
    }}>
        {children}
    </layersContext.Provider>
}