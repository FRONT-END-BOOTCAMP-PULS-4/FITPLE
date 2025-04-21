// hooks/useFetchApplyPut.ts

import { ApplyStatus } from '@/type/common';
import { useState } from 'react';

export function useFetchApplyPut() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const updateApplyStatus = async ({ applyId, status }: { applyId: number; status: ApplyStatus }) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch(`/api/member/apply?id=${applyId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    applyId,
                    status,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || '상태 업데이트 실패');
            }

            setSuccess(true);
            return result;
        } catch (err: any) {
            setError(err.message || '알 수 없는 에러');
        } finally {
            setLoading(false);
        }
    };

    return { updateApplyStatus, loading, error, success };
}
