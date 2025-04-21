'use client';

import { useRef, useState } from 'react';
import styles from './SelectBox.module.scss';
import { useOutsideClick } from '@/hooks/useOutsideClick';

export type SelectOption<T> = {
    value: T;
    label: string;
};

type SelectBoxProps<T> = {
    options: SelectOption<T>[];
    selectedValues: T[];
    onChange: (values: T[]) => void;
    placeholder?: string;
};

const SelectBox = <T,>({ options, selectedValues, onChange, placeholder = '선택해주세요' }: SelectBoxProps<T>) => {
    const [open, setOpen] = useState(false);
    const divRef = useRef<HTMLDivElement>(null);

    useOutsideClick(divRef, () => setOpen(false));

    const toggleOption = (value: T) => {
        if (selectedValues.includes(value)) {
            onChange(selectedValues.filter((v) => v !== value));
        } else {
            onChange([...selectedValues, value]);
        }
    };

    const getLabelByValue = (value: T) => options.find((opt) => opt.value === value)?.label;

    return (
        <div ref={divRef} className={styles.selectBoxWrapper}>
            <div className={styles.selectBox} onClick={() => setOpen((prev) => !prev)}>
                {selectedValues.length > 0 ? (
                    <div className={styles.selectedContainer}>
                        {selectedValues.map((v) => (
                            <div key={String(v)} className={styles.selectedItem}>
                                {getLabelByValue(v)}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={styles.placeholder}>{placeholder}</div>
                )}
            </div>

            {open && (
                <ul className={styles.optionList}>
                    {options.map((opt) => (
                        <li
                            key={String(opt.value)}
                            onClick={() => toggleOption(opt.value)}
                            className={`${styles.option} ${selectedValues.includes(opt.value) ? styles.selected : ''}`}
                        >
                            {opt.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SelectBox;
