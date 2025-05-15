'use client'

import { ChevronUpIcon, ChevronDownIcon, MinusIcon, PlusIcon, XIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { SizeVariant } from '@ui/_shared/types';

import { bounds } from '@ui/core/utils/math';
import { getInputSelection, isEmptyValue, isValidValue, parseValue } from './NumberInput.utils';
import { useNumberInput } from './useNumberInput';
import { handleRepeatedPress } from '@ui/handlers/handleRepeatedPress';

import classNameModule from '@ui/core/classname';
import styles from './NumberInput.module.scss';
const className = classNameModule(styles)

// Base shared props
interface BaseProps {
    format?: 'standard' | 'stepper';
    step?: number;
    min?: number;
    max?: number;
    size?: SizeVariant;
    integer?: boolean;
    fixed?: number
    expression?: boolean
    clearButton?: boolean
    onEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void
    required?: boolean
    name?: string
}

// No emptyValue: always number
interface NoEmpty extends BaseProps {
    emptyValue?: undefined;
    value: number;
    onValueChange: (value: number) => void;
}

// emptyValue === 'undefined': allow undefined
interface UndefinedEmpty extends BaseProps {
    emptyValue: 'undefined';
    value: number | undefined;
    onValueChange: (value: number | undefined) => void;
}

interface NullEmpty extends BaseProps {
    emptyValue: 'null';
    value: number | null;
    onValueChange: (value: number | null) => void;
}

// Discriminated union
export type NumberInputProps = NoEmpty | UndefinedEmpty | NullEmpty;

export const NumberInput = ({
    value,
    onValueChange,
    format = 'standard',
    step = 1,
    min,
    max,
    size = 'md',
    emptyValue,
    integer = false,
    clearButton,
    fixed,
    onEnter,
    required = false,
    name
}: NumberInputProps) => {

    const { inputRef, keyDownIsAllowed } = useNumberInput({
        integer,
        fixed
    })

    const hasFocusRef = useRef(false);

    const [isInvalidTyping, setIsInvalidTyping] = useState(false)
    const [isEmpty, setIsEmpty] = useState(isEmptyValue(String(value)))

    const [hasError, setHasError] = useState(false)

    useEffect(() => {
        if (hasFocusRef.current) return
        updateInputValue(value)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    function buttonUpdate(delta: number) {
        const clamped = bounds(delta, min, max);
        setHasError(false)
        onValueChange(clamped);
        updateInputValue(String(clamped))
        focusInput()
        return clamped
    }

    return (<div {...className('NumberInputContainer')}>
        <div {...className('NumberInput', { format, size, hasError })}>
            <div {...className('content')}>
                <input
                    ref={inputRef}
                    required={required}
                    name={name}
                    {...className('Input', { isInvalidTyping })}
                    type="text"
                    defaultValue={value ?? ''}
                    inputMode={integer ? 'numeric' : 'decimal'}

                    aria-label="Number input"
                    aria-invalid={isInvalidTyping || hasError}
                    onInvalid={e => {
                        e.preventDefault()
                        setHasError(true)
                    }}

                    onPaste={e => {

                        e.preventDefault()

                        const text = e.clipboardData.getData('text/plain')

                        if (integer) {
                            const value = parseInt(text)
                            if (isValidValue(String(value), integer, min, max, fixed)) {
                                onValueChange(value)
                                updateInputValue(String(value))
                            }
                        } else {
                            const value = parseFloat(text.replace(',', '.'))
                            if (isValidValue(String(value), integer, min, max, fixed)) {
                                onValueChange(value)
                                updateInputValue(String(value))
                            }

                        }

                    }}

                    onWheel={e => {
                        if (!hasFocusRef.current) return

                        e.preventDefault()

                        if (e.deltaY > 0) {
                            buttonUpdate((value ?? 0) - step)
                        } else {
                            buttonUpdate((value ?? 0) + step)
                        }
                    }}

                    onKeyDown={e => {
                        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                            e.preventDefault()
                            buttonUpdate((value ?? 0) + (e.key === "ArrowUp" ? step : -step))
                        }
                        if (!keyDownIsAllowed(e)) e.preventDefault()

                        if (e.key === 'Enter') {
                            onEnter?.(e)
                        }
                    }}
                    onChange={e => {

                        const valueString = e.target.value;

                        setHasError(false)

                        if (isEmptyValue(valueString)) {

                            setIsEmpty(true)

                            if (emptyValue === 'undefined') {
                                onValueChange(undefined);
                            } else if (emptyValue === 'null') {
                                onValueChange(null);
                            }
                        } else {
                            setIsEmpty(false)
                        }
                        if (isValidValue(valueString, integer, min, max, fixed, Boolean(emptyValue))) {
                            setIsInvalidTyping(false)

                            const parsedValue = parseValue(valueString, integer)

                            if (parsedValue === bounds(parsedValue, min, max))
                                onValueChange(parsedValue);
                        } else {
                            setIsInvalidTyping(true)
                        }

                        if (valueString.includes(',')) {

                            const selection = getInputSelection(e.target as HTMLInputElement)
                            if (!selection) return

                            updateInputValue(valueString.replace(',', '.'))
                            e.target.setSelectionRange(selection.start, selection.start)
                        }
                    }}

                    onFocus={() => { hasFocusRef.current = true; }}
                    onBlur={(e) => {
                        const valueString = e.target.value;
                        hasFocusRef.current = false;
                        setIsInvalidTyping(false)

                        if (isEmptyValue(valueString)) {
                            if (emptyValue === 'undefined') {
                                onValueChange(undefined);
                            } else if (emptyValue === 'null') {
                                onValueChange(null);
                            } else {
                                updateInputValue(String(value))
                            }
                            return
                        }

                        if (!isValidValue(valueString, integer, min, max, fixed)) {
                            e.target.value = (value === null || value === undefined) ?
                                '' : String(value);
                            return
                        }

                        if (integer) {
                            const value = bounds(parseInt(e.target.value), min, max)
                            updateInputValue(String(value))
                        } else {
                            const value = bounds(parseFloat(e.target.value), min, max)
                            updateInputValue(String(value))
                        }
                    }}
                />

                {
                    clearButton &&
                    Boolean(emptyValue) &&
                    !isEmpty &&
                    <button {...className('clearButton')}
                        onClick={() => {
                            if (emptyValue === 'undefined') {
                                onValueChange(undefined);
                                setIsEmpty(true)
                                updateInputValue('')
                            } else if (emptyValue === 'null') {
                                onValueChange(null);
                                setIsEmpty(true)
                                updateInputValue('')
                            }
                        }}

                    >
                        <XIcon size={14} />
                    </button>
                }
            </div>

            <Buttons
                format={format}
                handleUpdate={delta => {
                    const currentValue = parseValue(inputRef.current?.value ?? '', integer)
                    buttonUpdate(currentValue + delta * step)
                }}
            />
        </div>
        {
            hasError &&
            <div {...className('errorMessage')}>
                The entry is invalid
            </div>
        }
    </div>
    );

    function updateInputValue(value: string | number | undefined | null) {
        const inputElement = inputRef.current
        if (!inputElement) return

        if (value === undefined || value === null) {
            inputElement.value = ''
        } else {
            inputElement.value = String(value)
        }
    }

    function focusInput() {
        inputRef.current?.focus()
    }
};


type ButtonsProps = {
    format: 'standard' | 'stepper'
    handleUpdate: (delta: -1 | 1) => void
}

const Buttons = ({ format, handleUpdate }: ButtonsProps) => {
    return <div {...className('buttons')} onPointerDown={e => e.preventDefault()}>
        <button
            {...className('plusButton')}
            tabIndex={-1}
            // onClick={() => handleUpdate(1)}
            // onPointerDown={(e) => {
            //     e.preventDefault()
            //     handleUpdate(1)
            // }}
            aria-label="Increment value"
            aria-hidden="false"
            {...handleRepeatedPress({
                onStart: () => {
                    handleUpdate(1)
                },
                onRepeat: () => {
                    handleUpdate(1)
                }
            })}
        >
            {format === 'standard' ? <ChevronUpIcon size={12} /> : <PlusIcon size={15} />}
        </button>

        <button
            {...className('minusButton')}
            tabIndex={-1}
            onClick={() => handleUpdate(-1)}
            aria-label="Decrement value"
            aria-hidden="false"
            {...handleRepeatedPress({
                onStart: () => {
                    handleUpdate(-1)
                },
                onRepeat: () => {
                    handleUpdate(-1)
                }
            })}

        >
            {format === 'standard' ? <ChevronDownIcon size={12} /> : <MinusIcon size={15} />}
        </button>
    </div>
}