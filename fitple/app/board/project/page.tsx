'use client';

import { useEffect } from 'react';

const ProjectPage = () => {
    useEffect(() => {
        const fetchProjectDetail = async () => {
            const data = await fetch('/api/projects/1');

            const res = await data.json();
            console.log('detail', res);
            return res;
        };

        fetchProjectDetail();
    }, []);

    useEffect(() => {
        const fetchProjectList = async () => {
            const data = await fetch('/api/projects');

            const res = await data.json();
            console.log('list', res);
            return res;
        };

        fetchProjectList();
    }, []);

    const postProject = async () => {
        const fakeDto = {
            userId: 'fbb321b6-2dab-4aa9-8c02-290e6c7fb0b3', // 테스트용 유저 ID
            title: '가짜 프로젝트 제목',
            content: '이것은 테스트용 프로젝트입니다.',
            duration: 2,
            workMode: 'offline',
            status: 'open',
            skillIds: [2],
            positionIds: [2],
            images: ['https://via.placeholder.com/150', 'https://via.placeholder.com/300'],
        };

        const res = await fetch('/api/member/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fakeDto),
        });

        const result = await res.json();
        console.log('생성된 Project id:', result);
    };

    const updatePost = async () => {
        const fakeDto = {
            userId: 'fbb321b6-2dab-4aa9-8c02-290e6c7fb0b3', // 테스트용 유저 ID
            title: '제목 바꿔보기',
            content: '이것은 테스트용 입니다.',
            duration: 1,
            workMode: 'online',
            status: 'open',
            skillIds: [2],
            positionIds: [1],
            images: ['https://via.placeholder.com/150', 'https://via.placeholder.com/300'],
        };

        const res = await fetch('/api/member/projects/10', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fakeDto),
        });

        const result = await res.json();
        console.log('생성된 Project id:', result);
    };

    const deletePost = async () => {
        const res = await fetch('/api/member/projects/10', {
            method: 'DELETE',
        });
        const result = await res.json();
        console.log('삭제', result);
    };

    return (
        <div>
            <div>123</div>
            <button onClick={postProject}>post 하기</button>
            <button onClick={updatePost}>update 하기</button>
            <button onClick={deletePost}>delete 하기</button>
        </div>
    );
};

export default ProjectPage;
