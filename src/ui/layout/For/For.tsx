
import { Fragment } from 'react';

type ForProps<T> = {
    each: T[]
    children: (item: T, index: number) => React.ReactNode
}

export function For<T>({ each, children }: ForProps<T>) {
    return each.map((item, index) => (
        <Fragment key={index}>
            {children(item, index)}
        </Fragment>
    ))
};