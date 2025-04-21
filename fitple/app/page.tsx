'use client';

import { useEffect } from 'react';
import styles from './page.module.scss';

export default function Home() {
    useEffect(() => {
        const fetchProjectDetail = async () => {
            const response = await fetch('/api/projects/1');
            const data = await response.json();

            console.log('프로젝트 상세', data);
        };

        const fetchProjectList = async () => {
            const response = await fetch('/api/projects');
            const data = await response.json();

            console.log('프로젝트 리스트', data);
        };

        fetchProjectDetail();
        fetchProjectList();
    }, []);

    const handlePostProject = async () => {
        const fakeData = {
            userId: 'c1fd1600-a222-4c01-a8c9-94d09267b8e5',
            title: '테스트 입니다',
            content: '테스트 내용입니다',
            duration: 1,
            workMode: 'online',
            status: 'open',
            skillIds: [1, 2],
            imgUrls: [
                '{https://image.utoimage.com/preview/cp872722/2022/12/202212008462_500.jpg, https://media.istockphoto.com/id/157373207/ko/%EC%82%AC%EC%A7%84/%EA%B7%A0%ED%98%95-%EC%9E%A1%ED%9E%8C-%EA%B2%B0%EC%84%9D-%EC%9E%88%EB%8A%94-%ED%8E%98%EB%B8%94-%EB%B9%84%EC%B9%98-%EC%A4%91-%ED%95%B4%EC%A7%88%EB%85%98%EA%B9%8C%EC%A7%80.jpg?s=612x612&w=0&k=20&c=Ry2S96sojRl2jUnX-XAE5pD8qyj9FQSQnsCEUT_B0pU=}',
            ],
            positionIds: [3],
        };

        const response = await fetch('/api/member/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fakeData),
        });

        const responseData = await response.json();
        console.log('프로젝트 게시글 생성', responseData);
    };

    const handleUpdateProject = async () => {
        const fakeData = {
            userId: 'c1fd1600-a222-4c01-a8c9-94d09267b8e5',
            id: 18,
            title: '제목을 바꿔봅시다',
            content: '내용이 바뀌어야 정상입니다.',
            duration: 1,
            workMode: 'offline',
            status: 'open',
            positionIds: [3],
            skillIds: [3],
            imgUrls: ['{https://image.utoimage.com/preview/cp872722/2022/12/202212008462_500.jpg}'],
        };

        const response = await fetch('/api/member/projects/18', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fakeData),
        });

        const responseData = await response.json();
        console.log('프로젝트 게시글 수정', responseData);
    };

    const handlerDeleteProject = async () => {
        const response = await fetch('/api/member/projects/11', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const responseData = await response.json();
        console.log('프로젝트 삭제', responseData);
    };

    return (
        <div>
            <div className={styles.base}>기본! 123</div>
            <div className={styles.toss}>토스! 123</div>
            <button onClick={handlePostProject}>post 하기</button>
            <button onClick={handleUpdateProject}>put 하기</button>
            <button onClick={handlerDeleteProject}>delete 하기</button>
        </div>
    );
}
