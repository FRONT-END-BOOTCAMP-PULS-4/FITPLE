import { useAuthStore } from '@/stores/authStore';
import { ApplyStatus } from '@/type/common';
import { useState } from 'react';

export function useFetchOfferPut() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const { id } = useAuthStore();

    const updateOfferStatus = async ({
        offerId,
        status,
        receivedProjectId,
    }: {
        offerId: number;
        status: ApplyStatus;
        receivedProjectId: number;
    }) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch(`/api/member/offer/${offerId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    offerId,
                    status,
                }),
            });
            if (status === 'accept') {
                const teamResponse = await fetch(`/api/team`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        type: 'offer',
                        projectId: receivedProjectId,
                        receiveUserId: id,
                        applyUserId: offerId,
                    }),
                });
                if (!teamResponse.ok) {
                    throw new Error('팀 추가 실패');
                }
                const resData = await teamResponse.json();
                alert(resData.message);
            }

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || '상태 업데이트 실패');
            }

            setSuccess(true);
            return result;
        } catch (err) {
            setError(err instanceof Error ? err.message : '알 수 없는 에러');
        } finally {
            setLoading(false);
        }
    };

    return { updateOfferStatus, loading, error, success };
}
