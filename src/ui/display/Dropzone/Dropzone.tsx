import { useRef } from 'react';
import { UploadIcon } from 'lucide-react';

import { VStack } from '@ui/layout';
import { Text } from '@ui/typo/Text/Text';
import { pickFile } from '@ui/functions/pickFile/pickFile';

import { useStateRef } from '@ui/hooks/useStateRef';

import classNameModule from '@ui/core/classname';
import styles from './Dropzone.module.scss';
const className = classNameModule(styles)

type DropzoneProps = {
    multiple?: boolean
    accept?: string[]
    onSelectFiles?: (files: File[]) => void
}

/**
 * 
 */
export const Dropzone = ({ multiple = false, accept = [], onSelectFiles }: DropzoneProps) => {
    const [isDraggingOver, setIsDraggingOver, getIsDraggingOver] = useStateRef(false)
    const rootRef = useRef<HTMLDivElement>(null)

    return <div {...className('Dropzone', { isDraggingOver })}
        ref={rootRef}
        onDragOver={e => {
            e.preventDefault()
            e.stopPropagation()
            if (!getIsDraggingOver())
                setIsDraggingOver(true)
        }}
        onDragLeave={e => {
            e.preventDefault()
            const rootElement = rootRef.current
            if (!rootElement) return

            const relatedTarget = e.relatedTarget as HTMLElement
            if (!rootElement.contains(relatedTarget) && getIsDraggingOver())
                setIsDraggingOver(false)
        }}
        onDrop={e => {
            e.preventDefault()
            e.stopPropagation()
            setIsDraggingOver(false)
            onSelectFiles?.(Array.from(e.dataTransfer.files))
        }}
        onClick={async () => {
            const files = await pickFile(accept.join(','), multiple)
            onSelectFiles?.(files)
        }}>
        <VStack gap={2} align='center'>
            <UploadIcon size={20} style={{ marginBottom: 5 }} />
            <Text>Drag and drop files here</Text>
            <Text opacity={0.6} size='sm'>.png, .jpg up to 5MB</Text>
        </VStack>
    </div>;
};