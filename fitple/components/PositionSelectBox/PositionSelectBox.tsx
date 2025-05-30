"use client";

import { useOutsideClick } from "@/hooks/useOutsideClick";
import Badge from "../Badge/Badge";
import styles from "./PositionSelectBox.module.scss";
import React, { useRef, useState } from "react";

interface SelectBoxProps {
    options: string[];
    handler: (selectedOptions: string[]) => void; // 콜백 함수 타입 정의
}

export default function PositionSelectBox({ options, handler }: SelectBoxProps) {
    const divRef = useRef<HTMLDivElement>(null);
    useOutsideClick(divRef, () => setIsOpen(false));
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
        <div ref={divRef}>
            <div
                onClick={toggleModal}
                className={`${styles.selectBox} ${selectedOptions.length > 0 ? styles.selectBoxSelected : ""}`}
            >
                포지션
            </div>
            {isOpen && (
                <div className={styles.modal}>
                    {options.map((option) => (
                        <div
                            key={option}
                            onClick={() => handleOptionClick(option)}
                            className={`${styles.option} ${
                                selectedOptions.length === 0
                                    ? "" // 아무것도 선택하지 않았을 때 기본 스타일
                                    : selectedOptions.includes(option)
                                    ? "" // 선택된 옵션
                                    : styles.notSelected // 선택되지 않은 옵션
                            }`}
                        >
                            <Badge size="sm" role={option as "FE" | "BE" | "DI" | "PM" | "FS"}>
                                {option}
                            </Badge>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
