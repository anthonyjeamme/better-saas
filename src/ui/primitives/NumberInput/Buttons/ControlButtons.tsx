import { ChevronDownIcon } from 'lucide-react';
import { ChevronUpIcon } from 'lucide-react';

import { SizeVariant } from '../../../core/types';
import { handleRepeatedPress } from '../../../handlers/handleRepeatedPress';

import classNameModule from '../../../core/classname';
import styles from './ControlButtons.module.scss';
const className = classNameModule(styles)

type ControlButtonsProps = {
    handleUpdate: (delta: -1 | 1) => void
    size: SizeVariant
}

export const ControlButtons = ({ handleUpdate, size }: ControlButtonsProps) => {
    return <div
        {...className('ControlButtons', { size })}
        onPointerDown={e => e.preventDefault()}>
        <button
            {...className('plusButton')}
            tabIndex={-1}
            aria-label="Increment value"
            aria-hidden="false"
            {...handleRepeatedPress({
                onStart: () => handleUpdate(1),
                onRepeat: () => handleUpdate(1)
            })}
        >
            <ChevronUpIcon size={12} />
        </button>
        <button
            {...className('minusButton')}
            tabIndex={-1}
            aria-label="Decrement value"
            aria-hidden="false"
            {...handleRepeatedPress({
                onStart: () => handleUpdate(-1),
                onRepeat: () => handleUpdate(-1)
            })}
        ><ChevronDownIcon size={12} />
        </button>

    </div>;
};