'use client'

import { animate } from "@ui/_shared/utils/animate"
import { arrayMove } from "@ui/_shared/utils/array"
import { Box } from "@ui/display/Box/Box"
import { Container } from "@ui/display/Container/Container"
import { handleDrag } from "@ui/handlers/handleDrag"
import { useList } from "@ui/hooks/useList/useList"
import { VStack } from "@ui/layout"
import { useRef, useState } from "react"

export default function Page() {
    const list = useList([
        {
            id: '1',
            name: 'John'
        },
        {
            id: '2',
            name: 'Jane'
        },
        {
            id: '3',
            name: 'Jim'
        },
        {
            id: '4',
            name: 'Jill'
        }
    ])

    return <div style={{ padding: '50px 0' }}>
        <Container>

            <VerticalSortable
                items={list.items}
                setItems={list.setItems}
            >{
                    item => (
                        <Box variant='solid'>
                            {item.name}
                        </Box>
                    )
                }</VerticalSortable>
            {/* 
            <VStack gap={10}>
                <For each={list.items}>
                    {item => (
                        <SortableItem>
                            <Box variant='solid'>
                                {item.name}
                            </Box>
                        </SortableItem>
                    )}
                </For>
            </VStack> */}
        </Container>
    </div>
}


type SortableItemProps = {
    children?: React.ReactNode
    onMove: (y: number) => void
    onDragStart: () => void
}

const SortableItem = ({ children, onMove, onDragStart }: SortableItemProps) => {

    const rootRef = useRef<HTMLDivElement>(null)
    const [isDragging, setIsDragging] = useState(false)

    return <div

        data-sortable={true}
        ref={rootRef}
        style={{
            position: 'relative',
            zIndex: isDragging ? 1000 : 0,
            userSelect: 'none',
            opacity: isDragging ? 0.2 : 1
        }}
        {...handleDrag((_, e) => {

            e.preventDefault()
            setIsDragging(true)
            onDragStart()

            return {
                onMove: (_, e) => {
                    if (!rootRef.current) return
                    // rootRef.current.style.transform = `translate(${0}px, ${delta.y}px)`

                    onMove(e.clientY)

                },
                onEnd: async () => {
                    if (!rootRef.current) return
                    await animate(rootRef.current, {
                        transform: `none`,
                    }, {
                        duration: 100,
                        easing: 'ease-in-out'
                    })
                    rootRef.current.style.transform = `none`

                    setIsDragging(false)
                }
            }
        })}>
        {children}
    </div>
}

type VerticalSortableProps<T extends { id: string }> = {
    items: T[]
    setItems: (items: T[]) => void
    children: (item: T) => React.ReactNode
}

function VerticalSortable<T extends { id: string }>({ items, setItems, children }: VerticalSortableProps<T>) {

    const rootRef = useRef<HTMLDivElement>(null)
    const elementsThresholdsRef = useRef<number[]>([])

    const draggingIndexRef = useRef<number | null>(null)
    const draggingIdRef = useRef<string | null>(null)

    return <div ref={rootRef} onPointerDown={() => {
        refreshElementThresholds()
    }}>
        <VStack gap={10}>

            {
                items.map((item, index) => (
                    <SortableItem
                        key={item.id}
                        onDragStart={() => {
                            refreshElementThresholds()
                            draggingIndexRef.current = index
                            draggingIdRef.current = item.id
                        }}
                        onMove={y => {

                            let index = elementsThresholdsRef.current.findIndex(threshold => y < threshold)

                            if (index === -1) {
                                index = items.length - 1
                            }

                            if (draggingIndexRef.current === null) return

                            if (index !== draggingIndexRef.current) {
                                console.log("SHOULD MOVE !")

                                const newItems = arrayMove(items, draggingIndexRef.current, index)

                                setItems(newItems)
                                draggingIndexRef.current = index
                                refreshElementThresholds()

                            }


                        }}>{children(item)}</SortableItem>

                ))
            }

        </VStack>
    </div>


    function refreshElementThresholds() {
        const rootElement = rootRef.current
        if (!rootElement) return

        const sortableElements = rootElement.querySelectorAll('[data-sortable]')

        const elements = Array.from(sortableElements) as HTMLElement[]

        function getBounds(element: HTMLElement) {
            const rect = element.getBoundingClientRect()
            return {
                top: rect.top,
                bottom: rect.top + rect.height
            }
        }

        const bounds = elements.map(getBounds)

        const thresholds: number[] = []

        for (let i = 1; i < bounds.length; i++) {
            const previous = bounds[i - 1]
            const current = bounds[i]
            const middle = previous.bottom + (current.top - previous.bottom) / 2
            thresholds.push(middle)
        }

        elementsThresholdsRef.current = thresholds
    }
}