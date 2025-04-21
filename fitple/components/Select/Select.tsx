'use client';

import styles from './Select.module.scss';
import { createContext, useContext, useState, ReactNode } from 'react';

export type SelectContextType<T> = {
    selectedValue: T | null;
    onSelect: (value: T) => void;
};

const SelectContext = createContext<unknown>(null);

export function useSelectContext<T>(): SelectContextType<T> {
    const context = useContext(SelectContext);
    if (!context) throw new Error('Option must be used within a Select');
    return context as SelectContextType<T>;
}

type SelectOption<T> = {
    value: T;
    label: ReactNode;
};

type SelectProps<T> = {
    value?: T;
    onChange?: (value: T) => void;
    children: ReactNode;
    placeholder?: string;
    options: SelectOption<T>[];
};

const Select = <T,>({ value, onChange, children, placeholder = '선택하세요', options }: SelectProps<T>) => {
    const [internalValue, setInternalValue] = useState<T | null>(value ?? null);
    const [open, setOpen] = useState(false);

    const handleSelect = (value: T) => {
        setInternalValue(value);
        onChange?.(value);
        setOpen(false);
    };

    const selected = value ?? internalValue;
    const selectedLabel = options?.find((opt) => opt.value === selected)?.label ?? placeholder;

    return (
        <SelectContext.Provider value={{ selectedValue: selected, onSelect: handleSelect }}>
            <div className={styles.selectWrapper}>
                <div className={styles.selectBox} onClick={() => setOpen(!open)}>
                    {selectedLabel}
                </div>
                {open && <div className={styles.optionList}>{children}</div>}
            </div>
        </SelectContext.Provider>
    );
};

export default Select;
