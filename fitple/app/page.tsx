'use client';

import { useEffect } from 'react';
import styles from './page.module.scss';

export default function Home() {
    useEffect(() => {
        const fetchApply = async () => {
            const data = await fetch('/api/member/apply?id=1', {
                method: 'GET',
            });

            const response = await data.json();

            console.log(response);
            return response;
        };

        fetchApply();
    }, []);
    useEffect(() => {
        const fetchApply = async () => {
            const data = await fetch('/api/member/apply', {
                method: 'POST',
                // headers: {
                //     'Content-Type': 'application/json',
                // },
                body: JSON.stringify({
                    // userId: 'fc6c18d8-7a6a-4070-9c91-9f5116c8e283',
                    // projectId: 2,
                    message: '하이',
                }),
            });

            const response = await data.json();

            console.log(response);
            return response;
        };

        fetchApply();
    }, []);

    return (
        <div>
            <div className={styles.base}>기본! 123</div>
            <div className={styles.toss}>토스! 123</div>
        </div>
    );
}
