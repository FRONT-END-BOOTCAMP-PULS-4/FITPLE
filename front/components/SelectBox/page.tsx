'use client';
import styles from './page.module.scss';
import React, { useState } from 'react';

interface SelectBoxProps {
    options: string[];
}

export default function SelectBox({ options }: SelectBoxProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option: string) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter((item) => item !== option));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };

    return (
        <div>
            <div onClick={toggleModal} className={styles.selectBox}>
                {selectedOptions.length > 0 ? selectedOptions.join(', ') : '기술 스택'}
            </div>
            {isOpen && (
                <div className={styles.modal}>
                    {options.map((option) => (
                        <div
                            key={option}
                            onClick={() => handleOptionClick(option)}
                            className={`${styles.option} ${
                                selectedOptions.length === 0
                                    ? '' // 아무것도 선택하지 않았을 때 기본 스타일
                                    : selectedOptions.includes(option)
                                    ? '' // 선택된 옵션
                                    : styles.notSelected // 선택되지 않은 옵션
                            }`}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
