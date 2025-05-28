import { ErrorType } from "../NumberInput.types"
import { CustomErrorMessages } from "../NumberInput.types"

import classNameModule from '../../../core/classname';
import styles from './ErrorMessage.module.scss';
const className = classNameModule(styles)

type ErrorMessageProps = {
    errorType: ErrorType
    customErrorMessages?: CustomErrorMessages
}

/**
 * 
 */
export const ErrorMessage = ({ errorType, customErrorMessages }: ErrorMessageProps) => {
    const messages = {
        default: customErrorMessages?.default ?? `The entry is invalid`
    }
    return <div {...className('ErrorMessage')}>
        {messages[errorType]}
    </div>
}
