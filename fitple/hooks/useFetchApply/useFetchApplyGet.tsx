// useFetchApply.ts
import { useEffect, useState } from 'react';
import { Apply } from '@/back/apply/domain/entities/Apply';
export const useFetchApplyGet = (applyId: number) => {
    const [data, setData] = useState<Apply | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/member/apply?id=${applyId}`);
                const result = await res.json();
                setData(result);
            } catch (err) {
                setError('Failed to fetch');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [applyId]);

    return { data, loading, error };
};
