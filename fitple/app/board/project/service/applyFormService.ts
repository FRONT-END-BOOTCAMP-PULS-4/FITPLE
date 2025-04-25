import { ApplyFormData } from '@/app/mypage/components/ApplyForm';

export const applyFormService = async (accessToken: string, params: ApplyFormData) => {
    try {
        const res = await fetch(`/api/member/apply`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(params),
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        return data;
    } catch (error) {
        console.error('Failed to post apply :', error);
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('Unknown error occurred');
        }
    }
};
