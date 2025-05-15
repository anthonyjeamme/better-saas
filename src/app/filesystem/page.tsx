import { FileExplorer } from '@/screens/FileExplorer';

export default function Page() {

    const content = [
        {
            type: 'folder',
            name: 'Documents',
            children: [
                {
                    type: 'file',
                    name: 'Report.pdf',
                },
                {
                    type: 'folder',
                    name: 'Subfolder',
                    children: [
                        { type: 'file', name: 'Subreport.pdf' },
                        { type: 'file', name: 'Subreport2.pdf' },
                    ]
                }
            ]
        },
        {
            type: 'folder',
            name: 'Pictures',
            children: [
                {
                    type: 'file',
                    name: 'Photo.jpg',
                },
                {
                    type: 'folder',
                    name: 'Subfolder',
                    children: [
                        { type: 'file', name: 'Subreport.pdf' }
                    ]
                }
            ]
        }
    ]
    return <FileExplorer content={content} />
};