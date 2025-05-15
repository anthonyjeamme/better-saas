'use client'

import { XIcon } from 'lucide-react';
import { useRef, useState } from 'react';

import { bounds } from '@ui/core/utils/math';
import { useValueChangeEffect } from '@ui/hooks/useValueChange';

import {
    parseValue,
    isValidValue,
    isEmptyValue,
    getInputSelection,
} from './NumberInput.utils';
import { useNumberInput } from './useNumberInput';
import { ControlButtons } from './Buttons/ControlButtons';
import { ErrorMessage } from './ErrorMessage/ErrorMessage';
import { WarningMessage } from './WarningMessage/WarningMessage';
import { NumberInputProps, WarningType } from './NumberInput.types';

import classNameModule from '@ui/core/classname';
import styles from './NumberInput.module.scss';
const className = classNameModule(styles)

/**
 * 
 */
export const NumberInput = ({
    defaultValue,
    value, onValueChange,
    emptyValue,
    step = 1, min, max,
    size = 'md',
    integer = false,
    clearButton,
    fixed,
    name,

    // Customization
    icon,
    customWarningMessages,
    customErrorMessages,

    //
    required = false,
    disabled = false,
    readOnly = false,

    // Events
    onEnter,
    onEscape,
    onFocus,
    onBlur,
}: NumberInputProps) => {

    const { inputRef, keyDownIsAllowed } = useNumberInput({
        integer,
        fixed
    })

    const hasFocusRef = useRef(false);

    const [isInvalidTyping, setIsInvalidTyping] = useState(false)
    const [isEmpty, setIsEmpty] = useState(isEmptyValue(String(value)))

    const [warningType, setWarningType] = useState<WarningType | null>(null)

    const [hasError, setHasError] = useState(false)

    useValueChangeEffect(value, () => {
        if (hasFocusRef.current) return
        updateInputValue(value)
    }, [updateInputValue])

    return (<div {...className('NumberInputContainer')}>
        <div {...className('NumberInput', { size, hasError, disabled, hasWarning: Boolean(warningType) })}>
            <div {...className('content')}>
                {
                    icon && <div {...className('icon')}>
                        {icon}
                    </div>
                }
                <input
                    ref={inputRef}
                    required={required}
                    name={name}
                    {...className('Input', { isInvalidTyping, withIcon: Boolean(icon) })}
                    type="text"
                    defaultValue={value ?? ''}
                    inputMode={integer ? 'numeric' : 'decimal'}

                    aria-label="Number input"
                    aria-invalid={isInvalidTyping || hasError}
                    onInvalid={e => {
                        e.preventDefault()
                        setHasError(true)
                    }}
                    disabled={disabled}
                    readOnly={readOnly}
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
                        buttonUpdate(e.deltaY > 0 ? -step : step)
                    }}
                    onKeyDown={e => {
                        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                            e.preventDefault()
                            buttonUpdate(e.key === "ArrowUp" ? step : -step)
                        }
                        if (e.key === 'Enter') onEnter?.(e)
                        if (e.key === 'Escape') onEscape?.(e)

                        if (!keyDownIsAllowed(e)) e.preventDefault()
                    }}
                    onChange={e => {

                        const valueString = e.target.value;
                        setHasError(false)
                        refreshWarning(valueString)

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

                        const parsedValue = parseValue(valueString, integer)


                        if (isValidValue(valueString, integer, min, max, fixed, Boolean(emptyValue))) {
                            setIsInvalidTyping(false)


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

                    onFocus={e => {
                        hasFocusRef.current = true;
                        onFocus?.(e)
                    }}
                    onBlur={(e) => {
                        setWarningType(null)
                        const valueString = e.target.value;
                        hasFocusRef.current = false;
                        setIsInvalidTyping(false)
                        onBlur?.(e)

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

            {
                !readOnly && (

                    <ControlButtons
                        handleUpdate={delta => {
                            console.log(delta, step)
                            buttonUpdate(delta * step)
                        }}
                    />
                )
            }
        </div>

        {
            warningType && (
                <WarningMessage
                    warningType={warningType}
                    min={min}
                    max={max}
                    customWarningMessages={customWarningMessages} />
            )
        }

        {
            hasError &&
            <ErrorMessage
                errorType="default"
                customErrorMessages={customErrorMessages} />
        }
    </div>
    );


    function buttonUpdate(delta: number) {
        const currentValue = inputRef.current?.value ? parseValue(inputRef.current?.value, integer) : getDefaultValue()
        const clamped = bounds(currentValue + delta, min, max);
        setHasError(false)
        onValueChange(clamped);
        updateInputValue(String(clamped))
        focusInput()
        return clamped
    }

    function refreshWarning(value: string) {
        if (!value && !Boolean(emptyValue)) {
            setWarningType('empty')
        } else if (min !== undefined && parseFloat(value) < min) {
            setWarningType('min')
        } else if (max !== undefined && parseFloat(value) > max) {
            setWarningType('max')
        } else {
            setWarningType(null)
        }
    }

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

    function getDefaultValue() {
        if (defaultValue !== undefined) return defaultValue
        if (min !== undefined) return min
        if (max !== undefined) return max
        return 0
    }
};