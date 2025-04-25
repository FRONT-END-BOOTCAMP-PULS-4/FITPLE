'use client';

import { useEffect, useState } from 'react';
import Badge from '@/components/Badge/Badge';
import Card from '@/components/Card/Card';
import Image from 'next/image';
import styles from './page.module.scss';
import { useAuthStore } from '@/stores/authStore';
import Link from 'next/link';

interface TeamListDTO {
    id: number;
    projectId: number;
    projectTitle: string;
    avatarUrls: string[]; 
}

const TeamProjectListPage = () => {
    const userId = useAuthStore((state) => state.id);
    const [teams, setTeams] = useState<TeamListDTO[]>([]);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const res = await fetch(`/api/member/teams?userId=${userId}`);
                const data = await res.json();
                setTeams(data);
            } catch (error) {
                console.error('팀 목록 불러오기 실패:', error);
            }
        };

        if (userId) {
            fetchTeams();
        }
    }, [userId]);

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
                                {team.avatarUrls.map((url, index) => (
                                  <img
                                    key={index}
                                    src={url}
                                    alt={`team-member-${index}`}
                                    className={styles.avatar}
                                  />
                                ))}
                              </div>
                            </div>
                          }
                    />
                </Link>
            ))}
        </div>
    );
};

export default TeamProjectListPage;
