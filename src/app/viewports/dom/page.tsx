import classNameModule from '@ui/core/classname';
import styles from './page.module.scss';
import { DomViewport } from '@ui/modules/viewport/DomViewport';
import { Box } from '@ui/display/Box';
const className = classNameModule(styles)

export default function Page() {
    return <div {...className('Page')}>
        <DomViewport>

            <div style={{
                position: 'absolute',
                top: 100,
                left: 100
            }}>
                <Box padding='md' variant='outline'>Hello</Box>
            </div>

        </DomViewport>
    </div>;
};