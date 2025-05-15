import classNameModule from '@ui/core/classname';
import styles from './Modal.module.scss';
import { useCommand } from '@ui/hooks/useCommand';
import { createPortal } from 'react-dom';
import { Button } from '@ui/primitives';
import { XIcon } from 'lucide-react';
import { createContext, useContext } from 'react';
const className = classNameModule(styles)

type ModalProps = {
    children?: React.ReactNode;
    onClose?: () => void;
}


const modalContext = createContext<{ onClose?: () => void }>({})

export const Modal = ({ children, onClose }: ModalProps) => {
    useCommand('escape', () => onClose?.(), { stopPropagation: true, disabled: !onClose })
    return createPortal(
        <modalContext.Provider value={{ onClose }}>
            <div {...className('Modal')}>
                {children}
            </div>
        </modalContext.Provider>
        , document.body);
};

type ModalCoverProps = {
    children?: React.ReactNode;
    scrollable?: boolean;
}

const ModalCover = ({ children, scrollable = false }: ModalCoverProps) => {
    const { onClose } = useContext(modalContext)
    return <div {...className('ModalCover', { scrollable })}>

        {
            onClose && (
                <Button
                    variant='ghost'
                    size='sm'
                    shape='square'
                    onClick={onClose}
                    {...className('closeButton')}
                >
                    <XIcon size={15} />
                </Button>
            )
        }

        {children}
    </div>
}

Modal.Cover = ModalCover

type ModalDialogProps = {
    children?: React.ReactNode;
    placement?: 'top' | 'center' | 'bottom';
}

const ModalDialog = ({ children, placement = 'center' }: ModalDialogProps) => {
    const { onClose } = useContext(modalContext)
    return <div {...className('ModalDialog', { placement })}>
        <header>
            {
                onClose && (
                    <Button
                        variant='ghost'
                        size='sm'
                        shape='square'
                        onClick={onClose}
                    >
                        <XIcon size={15} />
                    </Button>
                )
            }
        </header>
        <div>

            {children}
        </div>
    </div>
}

Modal.Dialog = ModalDialog
