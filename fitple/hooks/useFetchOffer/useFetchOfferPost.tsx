import { OfferStatus } from '@/type/common';
import { useState } from 'react';

interface CreateOfferParams {
    userId: string;
    projectId: number;
    introductionId: number;
    message: string;
    status: OfferStatus;
}

export function useFetchOfferPost() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const createOffer = async (params: CreateOfferParams) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch('/api/member/offer', {
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

    return { createOffer, loading, error, success };
}
