import { ApplyStatus } from '@/type/common';
import { useState } from 'react';

interface CreateApplyParams {
    userId: string;
    projectId: number;
    message: string;
    status: ApplyStatus;
}

export function useFetchApplyPost() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const createApply = async (params: CreateApplyParams) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch('/api/member/apply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || '지원 요청 실패');
            }

            setSuccess(true);
            return result;
        } catch (err: any) {
            setError(err.message || '알 수 없는 에러');
        } finally {
            setLoading(false);
        }
    };

    return { createApply, loading, error, success };
}
