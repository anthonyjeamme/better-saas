import { LoaderCircleIcon } from 'lucide-react';

import classNameModule from '@ui/core/classname';
import styles from './Spinner.module.scss';
const className = classNameModule(styles)

type SpinnerProps = {
    size?: number
}

export const Spinner = ({ size = 15 }: SpinnerProps) => {
    return <LoaderCircleIcon size={size} {...className('Spinner')}></LoaderCircleIcon>;
};