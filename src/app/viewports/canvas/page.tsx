'use client'

import classNameModule from '@ui/core/classname';
import styles from './page.module.scss';
import { CanvasViewport } from '@ui/modules/viewport/CanvasViewport';
const className = classNameModule(styles)

export default function Page() {
    return <div {...className('Page')}>
        <CanvasViewport
            onDraw={(ctx) => {
                ctx.fillStyle = 'white'
                ctx.fillRect(0, 0, 800, 450)
            }}
            options={{
                maxZoom: 5,
                minZoom: 0.5,
                zoomFactor: 1.05,
            }}
        />
    </div>;
};