// hooks/useFetchApplyPut.ts

import { ApplyStatus } from '@/type/common';
import { useState } from 'react';

export function useFetchApplyPut() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const updateApplyStatus = async ({
        applyId,
        status,
        projectId,
        applyUserId,
    }: {
        applyId: number;
        status: ApplyStatus;
        projectId: number;
        applyUserId: string;
    }) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            console.log('API 요청 시작:', { applyId, status });
            const response = await fetch(`/api/member/apply/${applyId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    applyId,
                    status,
                }),
            });
            console.log('응답 받음:', response);
            const result = await response.json();

            if (status === 'accept') {
                console.log('수락 누름');
                const teamResponse = await fetch(`/api/team`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        projectId: projectId,
                        userId: applyUserId,
                    }),
                });
                const resData = await teamResponse.json();

                alert(resData.message);
            }

            if (!response.ok) {
                throw new Error(result.error || '상태 업데이트 실패');
            }

            setSuccess(true);
            return result;
        } catch (err: any) {
            console.error('API 요청 중 에러:', err);
            setError(err.message || '알 수 없는 에러');
        } finally {
            setLoading(false);
        }
    };

    return { updateApplyStatus, loading, error, success };
}
