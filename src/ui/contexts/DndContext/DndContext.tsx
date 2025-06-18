'use client'

import { createContext, useContext, useRef } from "react";

type DndContextType<T = unknown> = {
    draggableHandler: (data: T, active?: boolean) => {
        draggable: boolean
        onDragStart: (e: React.DragEvent<HTMLDivElement>) => void
        onDragEnd: () => void
    }
    getData: (e: React.DragEvent<HTMLDivElement>) => T
    getDraggingPayload: () => T | null
    scope: string
}

const dndContext = createContext<DndContextType<unknown> | null>(null)


type DndContextProviderProps = {
    children: React.ReactNode
    scope: string
}

export function DndContextProvider<T = unknown>({ children, scope }: DndContextProviderProps) {

    const draggingPayload = useRef<T | null>(null)

    return <dndContext.Provider value={{
        // @ts-expect-error It's ok
        draggableHandler,
        getData,
        getDraggingPayload,
        scope
    }}>
        {children}
    </dndContext.Provider>

    function draggableHandler(data: T, active = true) {
        return {
            draggable: active,
            onDragStart: (e: React.DragEvent<HTMLDivElement>) => {
                e.dataTransfer.setData('dnd/payload', JSON.stringify({ data, scope }))
                draggingPayload.current = data
            },
            onDragEnd: () => {
                draggingPayload.current = null
            }
        }
    }

    function getData(e: React.DragEvent<HTMLDivElement>): T | null {
        try {
            const payloadString = e.dataTransfer.getData('dnd/payload')

            const payload = JSON.parse(payloadString) as { data: T, scope: string }

            if (payload.scope !== scope) return null

            return payload.data
        } catch {
            return null
        }
    }

    function getDraggingPayload(): T | null {
        return draggingPayload.current
    }
}

export const useDndContext = <T = unknown>() => {
    const context = useContext(dndContext) as DndContextType<T> | null
    if (!context) {
        throw new Error('DndContext not found')
    }
    return context
}
