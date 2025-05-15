import { FolderIcon, MenuIcon, TrashIcon } from 'lucide-react';

import { Button } from '@ui/primitives';
import { useDropdown } from '@ui/hooks/useDropdown';

import classNameModule from '@ui/core/classname';
import styles from './Menu.module.scss';
const className = classNameModule(styles)

export const Menu = () => {

    const dropdown = useDropdown()

    return <div {...className('Menu')} ref={dropdown.rootRef}>
        <Button variant='outline' shape='square' size='md' onClick={dropdown.toggle}>
            <MenuIcon size={14} />
        </Button>
        {
            dropdown.isOpen && (
                <div {...className('dropdown')}>
                    <Button size='sm' variant='ghost'><FolderIcon size={14} /><span>Open</span></Button>
                    <Button size='sm' variant='ghost'><TrashIcon size={14} /><span>Remove</span></Button>
                </div>
            )
        }
    </div>;
};