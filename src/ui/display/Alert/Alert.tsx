import classNameModule from '../../core/classname';
import styles from './Alert.module.scss';
const className = classNameModule(styles)

type AlertProps = {
    children: React.ReactNode;
}

export const Alert = ({ children }: AlertProps) => {
    return <div {...className('Alert')}>
        {children}
    </div>;
};