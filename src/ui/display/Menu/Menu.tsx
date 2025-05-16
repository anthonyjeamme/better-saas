import { FolderIcon, MenuIcon, TrashIcon, XIcon } from 'lucide-react';

import { Button } from '@ui/primitives';
import { useDropdown } from '@ui/hooks/useDropdown';
import { ExtendedSizeVariant } from '@ui/core/types';

import classNameModule from '@ui/core/classname';
import styles from './Menu.module.scss';
const className = classNameModule(styles)

type MenuProps = {
    size?: ExtendedSizeVariant
}


export const Menu = ({ size = 'md' }: MenuProps) => {

    const dropdown = useDropdown()

    return <div {...className('Menu')} ref={dropdown.rootRef}>
        <Button variant='outline' shape='square' size={size} onClick={dropdown.toggle} onKeyDown={e => {
            if (e.key === "Escape" && dropdown.isOpen) {
                dropdown.close()
                e.stopPropagation()
                e.preventDefault()
            }
        }}>
            {
                dropdown.isOpen ? <XIcon style={{
                    height: `var(--font-size-${size})`
                }} /> : <MenuIcon style={{
                    height: `var(--font-size-${size})`
                }} />
            }
        </Button>
        {
            dropdown.isOpen && (
                <div {...className('dropdown')} onPointerDown={e => e.preventDefault()}>
                    <Button size='sm' variant='ghost' onClick={() => {
                        dropdown.close()
                    }}><FolderIcon size={14} /><span>Open</span></Button>
                    <Button size='sm' variant='ghost' onClick={() => {
                        dropdown.close()
                    }}><TrashIcon size={14} /><span>Remove</span></Button>
                </div>
            )
        }
    </div>;
};