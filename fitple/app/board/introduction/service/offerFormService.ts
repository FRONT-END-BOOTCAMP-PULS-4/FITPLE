import { OfferFormData } from '../components/OfferForm';

export const offerFormService = async (accessToken: string, params: OfferFormData) => {
    try {
        const res = await fetch(`/api/member/offer`, {
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
        console.error('Failed to post offer form :', error);
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('Unknown error occurred');
        }
    }
};
