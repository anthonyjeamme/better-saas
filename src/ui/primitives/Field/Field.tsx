import classNameModule from '@ui/core/classname';
import styles from './Field.module.scss';
const className = classNameModule(styles)

type FieldProps = {
    label?: React.ReactNode;
    children?: React.ReactNode;
}

export const Field = ({ label, children }: FieldProps) => {
    return <div {...className('Field')}>
        {label && <div {...className('label')}>{label}</div>}
        {children}
    </div>;
};