import classNameModule from '@ui/core/classname';
import styles from './Separator.module.scss';
import { SizeVariant } from '@ui/core/types';
const className = classNameModule(styles)

type SeparatorProps = {
    margin?: SizeVariant | 'none'
}

export const Separator = ({ margin = 'md' }: SeparatorProps) => {
    return <hr {...className('Separator', { margin })}

        style={{
            '--background-color': `var(--subtle-default-background)`
        } as React.CSSProperties}
    ></hr>;
};