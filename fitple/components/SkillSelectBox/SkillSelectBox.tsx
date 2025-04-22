'use client';
import SkillBadge from '../Badge/SkillBadge';
import styles from './SkillSelectBox.module.scss';
import React, { useState } from 'react';

interface SelectBoxProps {
    options: string[];
    handler: (selectedOptions: string[]) => void; // 콜백 함수 타입 정의
}

export default function SkillSelectBox({ options, handler }: SelectBoxProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const handleOptionClick = (option: string) => {
        let updatedOptions;
        if (selectedOptions.includes(option)) {
            updatedOptions = selectedOptions.filter((item) => item !== option);
        } else {
            updatedOptions = [...selectedOptions, option];
        }
        setSelectedOptions(updatedOptions);
        handler(updatedOptions); // 부모 컴포넌트로 선택된 옵션 전달
    };

    return (
        <div>
            <div
                onClick={toggleModal}
                className={`${styles.selectBox} ${selectedOptions.length > 0 ? styles.selectBoxSelected : ''}`}
            >
                기술 스택
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
                            <SkillBadge type="label" name={option} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
