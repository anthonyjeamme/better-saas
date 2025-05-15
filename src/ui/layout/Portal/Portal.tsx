import { createPortal } from 'react-dom';

type PortalProps = {
    children?: React.ReactNode
    target?: HTMLElement
}

export const Portal = ({ children, target }: PortalProps) => {
    return createPortal(children, target ?? document.body);
};