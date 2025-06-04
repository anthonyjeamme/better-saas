import classNameModule from '@ui/core/classname';
import styles from './CompactNumberInput.module.scss';
import { useEffect, useRef } from 'react';
import { handleDrag } from '@ui/handlers/handleDrag';
import { DiameterIcon } from 'lucide-react';
const className = classNameModule(styles)

type CompactNumberInputProps = {
    value: number
    onChange: (value: number) => void
    min?: number
    max?: number
    width?: number
}

export const CompactNumberInput = ({ value, onChange, min, max, width }: CompactNumberInputProps) => {

    const inputRef = useRef<HTMLInputElement>(null)

    const isEditingRef = useRef(false)

    useEffect(() => {
        if (isEditingRef.current) return

        const inputElement = inputRef.current
        if (!inputElement) return

        inputElement.value = value.toString()
    }, [value])

    return <div
        {...className('CompactNumberInput')}
        style={{
            width
        }}>
        <button
            {...handleDrag((_, e) => {

                if (e.button !== 0) return

                isEditingRef.current = true
                const initValue = value
                return {
                    onMove: ({ delta }) => {

                        const inputElement = inputRef.current
                        if (!inputElement) return

                        const newValue = clamp(initValue + delta.x, min, max)

                        onChange(newValue)
                        inputElement.value = newValue.toString()

                    },
                    onEnd: () => {
                        isEditingRef.current = false
                    }
                }
            })}
        ><DiameterIcon size={12} opacity={0.5} /></button>
        <input
            ref={inputRef}
            onKeyDown={e => {
                if (e.key === "ArrowUp") {
                    e.preventDefault()

                    update(value + 1)
                }
                if (e.key === "ArrowDown") {
                    e.preventDefault()
                    update(value - 1)
                }
                if (e.key === "Enter") {
                    e.preventDefault();

                    processValue((e.target as HTMLInputElement).value);

                    (e.target as HTMLInputElement).blur()
                }
            }}
            onFocus={e => {
                isEditingRef.current = true
                e.target.select()

            }}
            onBlur={e => {
                const value = e.target.value
                processValue(value);


                requestAnimationFrame(() => {
                    isEditingRef.current = false
                })
            }}
            defaultValue={value}
        />
    </div>

    function processValue(updateValue: string) {

        const parsedValue = parseFloat(updateValue)
        if (isNaN(parsedValue)) {
            update(value)
            return
        }
        const cleanedValue = clamp(parsedValue, min, max)
        update(cleanedValue)
    }


    function update(value: number) {

        const inputElement = inputRef.current
        if (!inputElement) return

        const cleanedValue = clamp(value, min, max)
        onChange(cleanedValue)
        inputElement.value = cleanedValue.toString()
    }
}

function clamp(value: number, min?: number, max?: number) {
    if (min !== undefined && value < min) return min
    if (max !== undefined && value > max) return max
    return value
}