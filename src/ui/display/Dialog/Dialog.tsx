import { XIcon } from 'lucide-react';

import { Portal } from '../../layout/Portal';
import { Button } from '../../primitives';

import classNameModule from '../../core/classname';
import styles from './Dialog.module.scss';
const className = classNameModule(styles)

type DialogProps = {
    title: string
    children?: React.ReactNode
    onClose?: () => void
}

export const Dialog = ({ title, onClose, children }: DialogProps) => {
    return <Portal>
        <div {...className('DialogContainer')}>

            <div {...className('Overlay')} />

            <div {...className('Dialog', ':dark-theme')}>
                <header>
                    <div {...className('title')}>{title}</div>
                    {
                        onClose &&
                        <Button shape='square' variant='ghost' onClick={onClose}>
                            <XIcon size={18} />
                        </Button>
                    }
                </header>
                <div>
                    {children}
                </div>
                <footer>
                    <Button variant='outline' onClick={onClose}>Cancel</Button>
                    <Button>Save</Button>
                </footer>
            </div>
        </div>
    </Portal>;
};