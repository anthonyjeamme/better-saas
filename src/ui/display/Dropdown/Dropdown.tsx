import classNameModule from '../../core/classname';
import styles from './Dropdown.module.scss';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
const className = classNameModule(styles)

type DropdownProps = {
    children: React.ReactNode
    isOpen: boolean
    onClose: () => void
}

export const Dropdown = ({ children, isOpen }: DropdownProps) => {

    // const dropdownRef = useRef<HTMLDivElement>(null)


    useEffect(() => {




    }, [])



    return createPortal(<div {...className('Dropdown', { isOpen })}>
        {children}
    </div>, document.body)
};