'use client';

import styles from './ApplyView.module.scss';
import Button from '@/components/Button/Button';
import Modal from '@/components/Modal/Modal';
import { useModal } from '@/hooks/useModal';
import Image from 'next/image';
import Link from 'next/link';

const fakeData = {
    id: 1,
    title: '프로젝트 제목',
    user: {
        nickname: '유덕',
        career: 1,
        avatarUrl: '/icons/user.svg',
    },
    skills: [
        { id: 1, name: 'react' },
        { id: 2, name: 'javascript' },
        { id: 3, name: 'next' },
        { id: 4, name: 'go' },
        { id: 5, name: 'firebase' },
        { id: 6, name: 'flutter' },
        { id: 7, name: 'python' },
        { id: 8, name: 'spring' },
        { id: 9, name: 'typescript' },
        { id: 10, name: 'php' },
        { id: 11, name: 'node' },
        { id: 12, name: 'vue' },
    ], // user_skill
    position: {
        id: 1,
        name: 'FE',
    },
    apply: {
        content:
            '안녕하세요 저는 1년차 프론트엔드 개발자입니다. 사이드 프로젝트 구하고 있는데 마음에 들어서 같이 프로젝트 하고 싶어요!',
        status: 'waiting',
    },
};

const ApplyView = () => {
    const { isOpen, openModal, closeModal } = useModal();

    return (
        <>
            {isOpen && (
                <Modal
                    header={
                        <div className={styles.title}>
                            <Link href={`/board/project/${fakeData.id}`}>{fakeData.title}</Link>
                        </div>
                    }
                    body={
                        <div className={styles.content}>
                            <div className={styles.avatarWrapper}>
                                <Image
                                    draggable={false}
                                    className={styles.avatar}
                                    src={fakeData.user.avatarUrl}
                                    alt="profile"
                                    width={100}
                                    height={100}
                                />
                            </div>
                            <span className={styles.nickname}>{fakeData.user.nickname}</span>
                            <span className={styles.position}>
                                {fakeData.position.name} ({fakeData.user.career}년차)
                            </span>

                            <p className={styles.applyContent}>{fakeData.apply.content}</p>
                        </div>
                    }
                    footer={
                        <div className={styles.btnBox}>
                            <Button variant="cancel" size="md" onClick={closeModal}>
                                거절
                            </Button>
                            <Button variant="confirm" size="md">
                                수락
                            </Button>
                        </div>
                    }
                    onClose={closeModal}
                />
            )}
            <button onClick={openModal}>apply view open</button>
        </>
    );
};

export default ApplyView;
