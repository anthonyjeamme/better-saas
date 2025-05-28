import { Portal } from '@ui/layout/Portal';
import classNameModule from '../../core/classname';
import styles from './Dialog.module.scss';
import { Button } from '@ui/primitives';
import { XIcon } from 'lucide-react';
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

            <div {...className('Dialog')}>
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