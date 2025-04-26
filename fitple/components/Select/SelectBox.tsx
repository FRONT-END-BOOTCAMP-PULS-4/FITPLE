'use client';

import { useRef, useState } from 'react';
import styles from './SelectBox.module.scss';
import { useOutsideClick } from '@/hooks/useOutsideClick';

type SelectBoxProps<TOption, TValue> = {
    options: TOption[];
    selectedValues: TValue[];
    onChange: (values: TValue[]) => void;
    placeholder?: string;
    maxSelected?: number;
    getLabel: (item: TOption) => string;
    getValue: (item: TOption) => TValue;
};

const SelectBox = <TOption, TValue>({
    options,
    selectedValues,
    onChange,
    placeholder = '선택해주세요',
    maxSelected,
    getLabel,
    getValue,
}: SelectBoxProps<TOption, TValue>) => {
    const [open, setOpen] = useState(false);
    const divRef = useRef<HTMLDivElement>(null);

    useOutsideClick(divRef, () => setOpen(false));

    const toggleOption = (value: TValue) => {
        const isSelected = selectedValues.includes(value);

        if (isSelected) {
            onChange(selectedValues.filter((v) => v !== value));
        } else {
            if (maxSelected && selectedValues.length >= maxSelected) return;
            onChange([...selectedValues, value]);
        }
    };

    const getLabelByValue = (value: TValue): string => {
        const option = options.find((opt) => getValue(opt) === value);
        return option ? getLabel(option) : '';
    };

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
                    {options.map((opt) => {
                        const val = getValue(opt);
                        const label = getLabel(opt);

                        return (
                            <li
                                key={String(val)}
                                onClick={() => toggleOption(val)}
                                className={`${styles.option} ${
                                    selectedValues.includes(val) ? styles.selected : styles.nonSelected
                                }`}
                            >
                                {label}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default SelectBox;
