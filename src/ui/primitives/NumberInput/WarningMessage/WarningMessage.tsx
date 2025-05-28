import { WarningType } from "../NumberInput.types"
import { CustomWarningMessages } from "../NumberInput.types"

import classNameModule from '../../../core/classname';
import styles from './WarningMessage.module.scss';
const className = classNameModule(styles)

type WarningMessageProps = {
    warningType: WarningType
    customWarningMessages?: CustomWarningMessages
    min?: number
    max?: number
}

/**
 * 
 */
export const WarningMessage = ({ warningType, min, max, customWarningMessages }: WarningMessageProps) => {
    const messages = {
        min: customWarningMessages?.min ?? `Should be greater or equal to ${min}`,
        max: customWarningMessages?.max ?? `Should be lower or equal to ${max}`,
        empty: customWarningMessages?.empty ?? `The entry is empty`
    }
    return <div {...className('WarningMessage')}>
        {messages[warningType]}
    </div>
}
