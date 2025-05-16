'use client'

import { useDropdown } from '@ui/hooks/useDropdown';

import { CheckIcon, ChevronDownIcon, XIcon } from 'lucide-react';

import { useHotkeys } from '@ui/hooks/useHotkey';
import { useRef, useState, useId, useEffect } from 'react';
import { useValueChangeEffect } from '@ui/hooks/useValueChange';

import classNameModule from '@ui/core/classname';
import styles from './Select.module.scss';
const className = classNameModule(styles)

type SelectOption = {
    label: React.ReactNode;
    value: string
    searchTerm?: string
}

type SelectOptionWithIndex = SelectOption & { index: number }

type SelectProps = SingleSelectProps | MultipleSelectProps

type SingleSelectProps = {
    multiple?: false;
    value: string
    onValueChange?: (value: string) => void
    options: SelectOption[];
    placeholder?: string
    label?: string;
    id?: string;
    disabled?: boolean;
    fullWidth?: boolean;
    search?: boolean;
}

type MultipleSelectProps = {
    multiple: true;
    value: string[]
    onValueChange?: (value: string[]) => void
    options: SelectOption[];
    placeholder?: string
    label?: string;
    id?: string;
    disabled?: boolean;
    fullWidth?: boolean;
    search?: boolean;
}


export const Select = (props: SelectProps) => {
    if (props.multiple) return <MultipleSelect {...props} />
    return <SingleSelect {...props} />
};


const SingleSelect = ({ options, value, onValueChange, placeholder, label, id: externalId, disabled, fullWidth, search }: SingleSelectProps) => {
    const internalId = useId();
    const id = externalId || internalId;
    const listboxId = `${id}-listbox`;
    const labelId = `${id}-label`;

    const dropdown = useDropdown()
    const dropdownRef = useRef<HTMLDivElement>(null)
    const [focusIndex, setFocusIndex] = useState(0)
    const buttonRef = useRef<HTMLButtonElement>(null)
    const currentOption = options.find(option => option.value === value)

    useValueChangeEffect(dropdown.isOpen, isOpen => {
        if (isOpen) {
            const index = options.findIndex(option => option.value === value)

            if (index === -1)
                moveFocusTo(0)
            else
                moveFocusTo(index)
        }
    }, [options, scrollToFocus, value])

    function moveFocusTo(index: number) {
        setFocusIndex(index)
        scrollToOptionAt(index)
    }

    function scrollToFocus() {
        const dropdown = dropdownRef.current
        if (!dropdown) return

        const option = dropdown.children[focusIndex] as HTMLButtonElement
        if (!option) return

        option.scrollIntoView({ block: 'nearest' })
    }

    function scrollToOptionAt(index: number) {
        const dropdown = dropdownRef.current
        if (!dropdown) return

        const option = dropdown.children[index] as HTMLButtonElement
        if (!option) return

        option.scrollIntoView({ block: 'nearest' })
    }

    return <div
        {...className('Select', 'large', { isOpen: dropdown.isOpen, fullWidth })}
        ref={dropdown.rootRef}>
        {label && <label id={labelId} htmlFor={id}>{label}</label>}
        <button
            id={id}
            onClick={dropdown.toggle}
            ref={buttonRef}
            aria-haspopup="listbox"
            aria-expanded={dropdown.isOpen}
            aria-labelledby={label ? labelId : undefined}
            aria-controls={dropdown.isOpen ? listboxId : undefined}
            disabled={disabled}
            onKeyDown={e => {
                if (['ArrowUp', 'ArrowDown', 'Enter', 'Space'].includes(e.key)) {
                    e.preventDefault()
                    e.stopPropagation()
                    dropdown.toggle()
                }
            }}
        >
            <span {...className('label')}>{currentOption?.label ?? placeholder ?? 'Select'}</span>
            <ChevronDownIcon size={12} aria-hidden="true" />
        </button>
        {dropdown.isOpen && (
            <Dropdown
                handleClose={() => {
                    dropdown.close()
                    buttonRef.current?.focus()
                }}
                search={search}
                id={listboxId}
                options={options}
                handleClick={(option) => {
                    if (option.value !== value)
                        onValueChange?.(option.value)
                    dropdown.close()
                    buttonRef.current?.focus()
                }}
                isSelected={option => option.value === value}
                optionIdPrefix={`${id}-option`}
                activeDescendant={focusIndex !== -1 ? `${id}-option-${focusIndex}` : undefined}
            />)}

    </div>;
}

const MultipleSelect = ({ options, value, onValueChange, placeholder, label, id: externalId, disabled, fullWidth, search }: MultipleSelectProps) => {
    const internalId = useId();
    const id = externalId || internalId;
    const listboxId = `${id}-listbox`;
    const labelId = `${id}-label`;

    const dropdown = useDropdown()
    const buttonRef = useRef<HTMLButtonElement>(null)

    const getLabel = () => {
        const selectedOptions = options.filter(option => value.includes(option.value))
        if (selectedOptions.length === 0) return placeholder ?? "Select"
        return selectedOptions.map(option => option.label).join(', ')
    }

    const selectedLabel = getLabel();
    const selectedCount = value.length;

    return <div
        {...className('Select', 'large', { isOpen: dropdown.isOpen, fullWidth })}
        ref={dropdown.rootRef}>
        {label && <label id={labelId} htmlFor={id}>{label}</label>}
        <button
            id={id}
            onClick={dropdown.toggle}
            ref={buttonRef}
            aria-haspopup="listbox"
            aria-expanded={dropdown.isOpen}
            aria-labelledby={label ? labelId : undefined}
            aria-controls={dropdown.isOpen ? listboxId : undefined}
            disabled={disabled}
            onKeyDown={e => {
                if (['ArrowUp', 'ArrowDown', 'Enter', 'Space'].includes(e.key)) {
                    e.preventDefault()
                    e.stopPropagation()
                    dropdown.toggle()
                }
            }}
        >
            <span {...className('label')}>{selectedLabel}</span>
            {selectedCount > 0 && (
                <span {...className('visually-hidden')}>
                    {selectedCount} {selectedCount === 1 ? 'item selected' : 'items selected'}
                </span>
            )}

            {
                selectedCount > 0 && (
                    <span role='button' onClick={(e) => {
                        e.stopPropagation()
                        onValueChange?.([])
                    }} {...className('cleanButton')}>
                        <XIcon size={12} />
                    </span>
                )
            }
            <ChevronDownIcon size={12} aria-hidden="true" />
        </button>
        {dropdown.isOpen && <Dropdown
            handleClose={() => {
                dropdown.close()
                buttonRef.current?.focus()
            }}
            search={search}
            id={listboxId}
            options={options}
            handleClick={(option) => {
                if (value.includes(option.value)) {
                    onValueChange?.(value.filter(v => v !== option.value))
                } else {
                    onValueChange?.(value.concat(option.value))
                }
            }}
            checkbox={true}
            isSelected={option => value.includes(option.value)}
            optionIdPrefix={`${id}-option`}
            multiselectable={true}
        />}
    </div>;
}


type DropdownProps = {
    options: SelectOption[]
    handleClick: (option: SelectOption) => void
    checkbox?: boolean
    isSelected: (option: SelectOption) => boolean
    id?: string;
    optionIdPrefix?: string;
    multiselectable?: boolean;
    activeDescendant?: string;
    search?: boolean;
    handleClose: () => void
}

const Dropdown = ({
    options,
    handleClick,
    checkbox,
    isSelected,
    id,
    optionIdPrefix,
    multiselectable,
    activeDescendant,
    search,
    handleClose
}: DropdownProps) => {
    const rootRef = useRef<HTMLDivElement>(null)
    const [focusIndex, setFocusIndex] = useState(0)

    const [searchValue, setSearchValue] = useState('')
    const searchRef = useRef<HTMLInputElement>(null)

    const filteredOptions = getFilteredOptions(searchValue)


    function getFilteredOptions(searchValue: string) {
        return options
            .map((option, index) => ({ ...option, index } as SelectOptionWithIndex))
            .filter(option => option.searchTerm?.toLowerCase().includes(searchValue.toLowerCase()))
    }

    useEffect(() => {
        const dropdownElement = rootRef.current
        if (!dropdownElement) return

        const selectedOption = dropdownElement.querySelector('[aria-selected="true"]')
        if (!selectedOption) return

        const selectedOptionIndex = parseInt(selectedOption.getAttribute('data-index') ?? '0')
        updateFocusIndex(selectedOptionIndex, true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function updateFocusIndex(index: number, autoScroll?: boolean) {
        setFocusIndex(index)
        if (autoScroll) scrollToOptionAt(index)

    }

    function scrollToOptionAt(index: number) {
        const dropdown = rootRef.current
        if (!dropdown) return
        const optionElement = dropdown.querySelector(`[data-index="${index}"]`)
        if (!optionElement) return

        optionElement.scrollIntoView({ block: 'nearest' })
    }

    useHotkeys({
        'arrowup': () => {
            const currentIndex = filteredOptions.findIndex(option => option.index === focusIndex)
            let previousIndex = currentIndex - 1
            if (previousIndex < 0) previousIndex = filteredOptions.length - 1
            updateFocusIndex(filteredOptions[previousIndex]?.index ?? 0, true)
        },
        'arrowdown': () => {
            const currentIndex = filteredOptions.findIndex(option => option.index === focusIndex)
            const nextIndex = filteredOptions[(currentIndex + 1) % filteredOptions.length]?.index ?? 0
            updateFocusIndex(nextIndex, true)
        },
        'enter': () => {
            const option = options[focusIndex]
            if (option) handleClick(option)
        },
        'escape': () => {
            if (searchValue) {
                setSearchValue('')
                requestAnimationFrame(() => {
                    scrollToOptionAt(focusIndex)
                })
            }
            else handleClose()
        },
    }, {
        preventDefault: true,
        stopPropagation: true
    })


    return <div
        {...className('Dropdown', { hasSearch: Boolean(searchValue) })}
        ref={rootRef}
        id={id}
        role="listbox"
        aria-multiselectable={multiselectable}
        aria-activedescendant={activeDescendant}
        onPointerDown={e => e.preventDefault()}
    >
        {search && <div {...className('Search', { empty: !searchValue })}>
            <input
                ref={searchRef} autoFocus
                value={searchValue}
                onChange={e => {
                    const searchValue = e.target.value
                    setSearchValue(searchValue)

                    const filteredOptions = getFilteredOptions(searchValue)

                    updateFocusIndex(filteredOptions[0]?.index ?? 0, true)
                }}
            />
            <button {...className('cleanButton')} onClick={() => {
                setSearchValue('')
            }}>
                <XIcon size={12} />
            </button>
        </div>}
        {
            filteredOptions.length === 0 && <div {...className('Empty')}>No results found</div>
        }
        {filteredOptions.map(({ index, ...option }) =>
            <button
                id={optionIdPrefix ? `${optionIdPrefix}-${index}` : undefined}
                key={option.value}
                onClick={() => handleClick(option)}
                onMouseMove={() => setFocusIndex(index)}
                {...className({ isFocused: focusIndex == index, isSelected: isSelected(option) })}
                role="option"
                aria-selected={isSelected(option)}
                data-value={option.value}
                data-index={index}
            >
                {checkbox && <span {...className('check', { isSelected: isSelected(option) })} aria-hidden="true">
                    {isSelected(option) && <CheckIcon size={12} />}
                </span>}
                <span {...className('label')}>{option.label}</span>
            </button>
        )}
    </div>
}

Dropdown.displayName = 'Dropdown'