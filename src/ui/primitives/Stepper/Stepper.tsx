import classNameModule from '../../core/classname';
import styles from './Stepper.module.scss';
const className = classNameModule(styles)

type StepperProps = {
    value: number
}

export const Stepper = ({ }: StepperProps) => {
    return <div {...className('Stepper')}>TODO</div>;
};