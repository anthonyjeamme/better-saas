import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

import { Button } from '../../primitives/Button';

import classNameModule from '../../core/classname';
import styles from './DatePicker.module.scss';
const className = classNameModule(styles)

export type DateData = {
    day: number
    month: number
    year: number
}

type DatePickerProps = {
    handleClickDate: (date: DateData) => void
}

export const DatePicker = ({ handleClickDate }: DatePickerProps) => {

    const [currentMonth, setCurrentMonth] = useState({
        month: 1,
        year: 2025
    })

    const [selectedRange, setSelectedRange] = useState<{ from: DateData | null; to: DateData | null }>({
        from: null,
        to: null
    })

    return <div {...className('DatePicker')}>

        <header>
            <Button variant='outline' shape='circle'
                onClick={() => {
                    if (currentMonth.month === 1) {
                        setCurrentMonth({
                            month: 12,
                            year: currentMonth.year - 1
                        })
                    } else {
                        setCurrentMonth({
                            month: currentMonth.month - 1,
                            year: currentMonth.year
                        })
                    }
                }}


            ><ChevronLeftIcon size={15} /></Button>

            <div>
                {format2Digits(currentMonth.month)} / {currentMonth.year}
            </div>
            <Button variant='outline' shape='circle' onClick={() => {
                if (currentMonth.month === 12) {
                    setCurrentMonth({
                        month: 1,
                        year: currentMonth.year + 1
                    })
                } else {
                    setCurrentMonth({
                        month: currentMonth.month + 1,
                        year: currentMonth.year
                    })
                }
            }}><ChevronRightIcon size={15} /></Button>
        </header>

        <MonthView month={currentMonth.month} year={currentMonth.year} handleClickDate={date => {

            if (selectedRange.from && !selectedRange.to) {
                setSelectedRange({
                    from: selectedRange.from,
                    to: date
                })
                handleClickDate(date)
            } else {
                setSelectedRange({
                    from: date,
                    to: null
                })
                handleClickDate(date)
            }

        }} selectedRange={selectedRange} />
    </div>;
};


type MonthViewProps = {
    month: number
    year: number
    handleClickDate: (date: DateData) => void
    selectedRange: { from: DateData | null; to: DateData | null }
}

const MonthView = ({ month, year, handleClickDate, selectedRange }: MonthViewProps) => {

    const [hoverDate, setHoverDate] = useState<DateData | null>(null)

    const firstDayOfMonthWeekday = getFirstDayOfMonthWeekday(month, year)
    const daysInMonth = getDaysInMonth(month, year)


    function getActiveRange() {

        if (!selectedRange.from && !selectedRange.to) {

            return {
                from: hoverDate,
                to: hoverDate
            }
        }

        if (selectedRange.from && !selectedRange.to) {
            return {
                from: selectedRange.from,
                to: hoverDate
            }
        }

        return selectedRange
    }

    const activeRange = getActiveRange()


    return <div {...className('MonthView')}>
        {
            Array.from({ length: firstDayOfMonthWeekday }).map((_, i) => {
                const previousMonth = month === 1 ? 12 : month - 1
                const previousYear = month === 1 ? year - 1 : year
                const daysInPreviousMonth = getDaysInMonth(previousMonth, previousYear)
                const dayNumber = daysInPreviousMonth - firstDayOfMonthWeekday + i + 1

                return <div key={i} {...className('outMonth')}>
                    {format2Digits(dayNumber)}
                </div>
            })
        }
        {
            Array.from({ length: daysInMonth }).map((_, i) => {
                const currentDate = {
                    day: i + 1,
                    month,
                    year
                }

                const isInRange = isDateInRange(currentDate, activeRange)
                const isRangeStart = isDateEqual(currentDate, activeRange.from)
                const isRangeEnd = isDateEqual(currentDate, activeRange.to)

                return <div
                    key={i}
                    {...className('inMonth')}
                    onClick={() => handleClickDate({
                        day: i + 1,
                        month,
                        year
                    })}
                    onMouseEnter={() => setHoverDate(currentDate)}
                    onMouseLeave={() => setHoverDate(null)}
                >

                    <span>{format2Digits(i + 1)}</span>
                    {
                        isInRange &&
                        <Fill start={isRangeStart} end={isRangeEnd} />
                    }
                </div>
            })
        }
        {
            (() => {
                const totalCellsUsed = firstDayOfMonthWeekday + daysInMonth
                const totalWeeksNeeded = Math.ceil(totalCellsUsed / 7)
                const totalCellsNeeded = totalWeeksNeeded * 7
                const remainingCells = totalCellsNeeded - totalCellsUsed

                return Array.from({ length: remainingCells }).map((_, i) => {
                    return <div key={`next-${i}`} {...className('outMonth')}>
                        {format2Digits(i + 1)}
                    </div>
                })
            })()
        }
    </div>
}

function getDaysInMonth(month: number, year: number): number {
    return new Date(year, month, 0).getDate()
}

function getFirstDayOfMonthWeekday(month: number, year: number): number {
    const firstDayOfMonth = new Date(year, month - 1, 1, 10)
    return firstDayOfMonth.getDay()
}


function format2Digits(value: number): string {
    return value.toString().padStart(2, '0')
}

function isDateEqual(date1: DateData, date2: DateData | null): boolean {
    if (!date2) {
        return false
    }
    return date1.day === date2.day && date1.month === date2.month && date1.year === date2.year
}

function isDateInRange(date: DateData, range: { from: DateData | null; to: DateData | null }): boolean {
    if (!range.from || !range.to) {
        return false
    }
    const dateValue = new Date(date.year, date.month - 1, date.day).getTime()
    const fromValue = new Date(range.from.year, range.from.month - 1, range.from.day).getTime()
    const toValue = new Date(range.to.year, range.to.month - 1, range.to.day).getTime()

    return dateValue >= fromValue && dateValue <= toValue
}

type FillProps = {
    start?: boolean
    end?: boolean
}

const Fill = ({ start, end }: FillProps) => {
    return <div {...className('Fill', { start, end })}></div>
}