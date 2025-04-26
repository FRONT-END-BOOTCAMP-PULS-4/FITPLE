import { IntroductionFormData } from '../components/IntroductionForm';

export const postIntroduction = async (accessToken: string, params: IntroductionFormData) => {
    try {
        const res = await fetch('/api/member/introductions', {
            method: 'POST',
            headers: {
                'Content-Type': 'applcation/json',
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
        console.error('Failed to post introductions:', error);

        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('Unknown error occurred');
        }
    }
};
