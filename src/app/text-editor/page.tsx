'use client'

import { TextEditor } from '@ui/modules/text-editor/TextEditor/TextEditor';
import { useState } from 'react';


import classNameModule from '@ui/core/classname';
import styles from './page.module.scss';
import { Textarea } from '@ui/primitives';
import { Grid } from '@ui/display/Grid';
import { markdownToHTML } from '@ui/modules/text-editor/TextEditor/render.utils';
const className = classNameModule(styles)

export default function Page() {
    const [value, setValue] = useState('Je suis content de te revoir')

    return <div {...className('Page')}>

        <Grid columns={2}>
            <TextEditor value={value} onValueChange={setValue} />
            <Textarea value={value} style={{ height: 500, border: '1px solid #ffffff11' }} />
        </Grid>

        <div>
            <div dangerouslySetInnerHTML={{ __html: markdownToHTML(value) }} />
        </div>
    </div>;
};