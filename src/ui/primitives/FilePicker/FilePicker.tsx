import { Button } from '../Button/Button';
import { UploadCloudIcon } from 'lucide-react';

import classNameModule from '@ui/core/classname';
import styles from './FilePicker.module.scss';
import { useState } from 'react';
import { For } from '@ui/layout/For/For';
import { Box } from '@ui/display/Box/Box';
import { VStack } from '@ui/layout';
import { Separator } from '../Separator/Separator';
import { pickFile } from '@ui/functions/pickFile/pickFile';
const className = classNameModule(styles)

export const FilePicker = () => {

    const [files, setFiles] = useState<File[]>([])

    return <div {...className('FilePicker')}>
        <Button variant='outline' size='md' onClick={async () => {

            try {

                const file = await pickFile('image/*', false)
                // @ts-expect-error should be ok
                setFiles([...files, file])

            } catch {

                console.log("NO FILE")
            }
        }}>
            <UploadCloudIcon size={14} />
            <span>Upload</span>
        </Button>

        <Separator />

        <VStack gap={10}>
            <For each={files}>{
                file => <Box variant='outline' stack='horizontal' align='center' gap={10}>
                    <ImageFilePreview file={file} />
                    <span>{file.name}</span>
                </Box>}</For>
        </VStack>
    </div>;
};



const ImageFilePreview = ({ file }: { file: File }) => {
    return <div>
        <img src={URL.createObjectURL(file)} alt={file.name} height={30} />
    </div>;
};
