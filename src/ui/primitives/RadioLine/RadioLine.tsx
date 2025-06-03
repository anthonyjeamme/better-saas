import { SizeVariant, ThemeVariant } from '@ui/core/types';
import classNameModule from '../../core/classname';
import styles from './RadioLine.module.scss';
import { Radio } from '../Radio/Radio';
const className = classNameModule(styles)

type RadioLineProps = {
    value?: boolean
    onValueChange?: (value: boolean) => void
    disabled?: boolean
    size?: SizeVariant
    theme?: ThemeVariant
    variant?: 'solid' | 'subtle' | 'outline'
    children: React.ReactNode
    vMargin?: SizeVariant
}

export const RadioLine = ({ children, value, onValueChange, vMargin }: RadioLineProps) => {
    return <div
        {...className('RadioLine', `:vMargin-${vMargin}`)}
        onClick={() => onValueChange?.(!value)}

        onPointerDown={e => e.preventDefault()}
    >
        <div>
            <Radio value={value} />
            <div>
                {children}
            </div>
        </div>
    </div>;
};