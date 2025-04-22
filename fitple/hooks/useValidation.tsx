'use client';
import { useState } from 'react';

export const useValidation = () => {
    const [isValid, setIsValid] = useState(true); // 유효성 상태
    const [errorMessage, setErrorMessage] = useState<string | null>(null); // 에러 메시지

    const validate = (career?: number | null, position?: string | null) => {
        if (career !== undefined) {
            if (!career) {
                setIsValid(false);
                setErrorMessage('경력을 선택해주세요.');
                return false;
            }
        }

        if (position !== undefined) {
            if (!position) {
                setIsValid(false);
                setErrorMessage('직무를 선택해주세요.');
                return false;
            }
        }

        setIsValid(true);
        setErrorMessage(null);
        return true;
    };

    return { isValid, errorMessage, validate };
};
