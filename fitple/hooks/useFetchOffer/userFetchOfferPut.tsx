import { ApplyStatus } from '@/type/common';
import { useState } from 'react';

export function useFetchOfferPut() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const updateOfferStatus = async ({ offerId, status }: { offerId: number; status: ApplyStatus }) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch(`/api/member/offer?id=${offerId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    offerId,
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

    return { updateOfferStatus, loading, error, success };
}
