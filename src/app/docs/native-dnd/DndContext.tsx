import { createContext, useContext, useState } from "react"

type DndContextData = {
    draggingData: unknown | null
    setDraggingData: (data: unknown | null) => void
}

const dndContext = createContext<DndContextData | null>(null)


export const DndProvider = ({ children }: { children: React.ReactNode }) => {

    const [draggingData, setDraggingData] = useState<unknown | null>(null)

    console.log(draggingData)

    return <dndContext.Provider value={{
        draggingData,
        setDraggingData
    }}>
        {children}
    </dndContext.Provider>
}


export function useDndContext() {
    const context = useContext(dndContext)
    if (!context) {
        throw new Error('useDndContext must be used within a DndProvider')
    }
    return context
}
