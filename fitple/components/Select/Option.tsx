'use client';

import styles from './Option.module.scss';
import { ReactNode } from 'react';
import { useSelectContext } from './Select';

type OptionProps<T> = {
    value: T;
    children: ReactNode;
};

const Option = <T,>({ value, children }: OptionProps<T>) => {
    const { onSelect, selectedValue } = useSelectContext<T>();

    const isSelected = selectedValue === value;

    return (
        <div className={`${styles.optionItem} ${isSelected ? styles.selected : ''}`} onClick={() => onSelect(value)}>
            {children}
        </div>
    );
};

export default Option;
