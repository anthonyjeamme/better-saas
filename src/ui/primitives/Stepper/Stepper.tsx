import classNameModule from '@ui/core/classname';
import styles from './Stepper.module.scss';
const className = classNameModule(styles)

type StepperProps = {}

export const Stepper = ({ }: StepperProps) => {
    return <div {...className('Stepper')}>TODO</div>;
};