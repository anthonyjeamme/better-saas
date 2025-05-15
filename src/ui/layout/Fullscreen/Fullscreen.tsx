import classNameModule from '@ui/core/classname';
import styles from './Fullscreen.module.scss';
const className = classNameModule(styles)

type FullscreenProps = {
    children?: React.ReactNode
    scroll?: boolean
    horizontal?: boolean
}

export const Fullscreen = ({ children, scroll, horizontal }: FullscreenProps) => {
    return <div {...className('Fullscreen', { scroll, horizontal })}>
        {children}
    </div>;
}; 