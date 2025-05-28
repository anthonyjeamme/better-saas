'use client'

import classNameModule from '@ui/core/classname';
import styles from './page.module.scss';
import { SvgViewport } from '@ui/modules/viewport/SvgViewport';
import { useState } from 'react';
const className = classNameModule(styles)

export default function Page() {

    const [elements, setElements] = useState<{ x: number, y: number }[]>([])

    return <div {...className('Page')}>
        <SvgViewport onClick={e => {
            console.log(e)
            setElements([...elements, e])
        }}>
            <rect x={100} y={100} width={100} height={100} fill='red' />
            {elements.map((e, i) => (
                <rect key={i} x={e.x} y={e.y} width={100} height={100} fill='blue' />
            ))}
        </SvgViewport>
    </div>;
};