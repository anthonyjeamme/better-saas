import classNameModule from '@ui/core/classname';
import styles from './Separator.module.scss';
import { SizeVariant, ThemeVariant } from '@ui/core/types';
const className = classNameModule(styles)

type SeparatorProps = {
    margin?: SizeVariant | 'none'
    theme?: ThemeVariant
}

export const Separator = ({ margin = 'md', theme = 'default' }: SeparatorProps) => {
    return <hr {...className('Separator', { margin, theme })}

        style={{
            '--background-color': `var(--subtle-${theme}-border)`
        } as React.CSSProperties}
    ></hr>;
};