import { Button } from '../Button/Button';
import { UploadCloudIcon } from 'lucide-react';

import { pickFile } from '@ui/functions/pickFile/pickFile';

import classNameModule from '@ui/core/classname';
import styles from './FilePicker.module.scss';
const className = classNameModule(styles)

type FilePickerProps = {
    onPickedFiles?: (files: File[]) => void
}

export const FilePicker = ({ onPickedFiles }: FilePickerProps) => {

    return <div {...className('FilePicker')} onDragOver={e => {
        e.preventDefault()
        e.stopPropagation()
    }}
        onDrop={e => {
            e.preventDefault()
            e.stopPropagation()

            const files = e.dataTransfer.files
            onPickedFiles?.(Array.from(files))
        }}
    >
        <Button variant='outline' size='md' onClick={async () => {
            try {

                const files = await pickFile('image/*', false)
                onPickedFiles?.(files)

            } catch {

                console.log("NO FILE")
            }
        }}>
            <UploadCloudIcon size={14} />
            <span>Upload</span>
        </Button>
    </div>;
};



// const ImageFilePreview = ({ file }: { file: File }) => {
//     return <div>
//         <img src={URL.createObjectURL(file)} alt={file.name} height={30} />
//     </div>;
// };
