import { SizeVariant, ThemeVariant } from '@ui/core/types';
import classNameModule from '../../core/classname';
import styles from './CheckboxLine.module.scss';
import { Checkbox } from '../Checkbox/Checkbox';
const className = classNameModule(styles)

type CheckboxLineProps = {
    value?: boolean
    onValueChange?: (value: boolean) => void
    disabled?: boolean
    size?: SizeVariant
    theme?: ThemeVariant
    variant?: 'solid' | 'subtle' | 'outline'
    children: React.ReactNode
    vMargin?: SizeVariant
}

export const CheckboxLine = ({ children, value, onValueChange, vMargin }: CheckboxLineProps) => {
    return <div
        {...className('CheckboxLine', `:vMargin-${vMargin}`)}
        onClick={() => onValueChange?.(!value)}

        onPointerDown={e => e.preventDefault()}
    >
        <div>
            <Checkbox value={value} />
            <div>
                {children}
            </div>
        </div>
    </div>;
}; 