'use client';

import Badge from '@/components/Badge/Badge';
import Card from '@/components/Card/Card';
import styles from './page.module.scss';
import Link from 'next/link';

interface Project {
    id: number;
    projectId: number;
    projectTitle: string;
    avatarUrl: string;
}

const RequestProjectPage = () => {

    return (
        <div className={styles.gridContainer}>
            {teams.map((team) => (
               <Link href={`/mypage/team/${team.projectId}`} key={team.id}>
                    <Card
                        key={team.id}
                        header={
                            <div>
                                <Badge size="md">
                                    <span className={styles.customSpan}>📂 프로젝트</span>
                                </Badge>
                            </div>
                        }
                        body={
                            <div className={styles.bodyBox}>
                                <p className={styles.projectTitle}>{team.projectTitle}</p>
                            </div>
                        }
                        footer={
                            <div className={styles.footer}>
                                <div className={styles.avatarGroup}>
                                    <img
                                        src={team.avatarUrl}
                                        alt="avatar"
                                        className={styles.avatar}
                                    />
                                </div>
                            </div>
                        }
                    />
                </Link>
            ))}
        </div>
    );
};

export default RequestProjectPage;
