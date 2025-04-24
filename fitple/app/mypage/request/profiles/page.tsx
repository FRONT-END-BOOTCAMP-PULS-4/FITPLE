'use client';

import Card from '@/components/Card/Card';
import styles from './page.module.scss';
import Badge from '@/components/Badge/Badge';
import SkillBadge from '@/components/Badge/SkillBadge';
import Image from 'next/image';

interface Member {
  userNickname: string;
  userAvatarUrl: string;
  userPosition: string;
  userSkill: string;
}

const positionMap: { [key: string]: string } = {
  FE: '프론트엔드',
  BE: '백엔드',
  PM: '프로젝트 매니저',
  DI: '디자이너',
  FS: '풀스택',
};

const RequestProfilePage = () => {

  return (
    <div className={styles.gridContainer}>
      {members.map((member, index) => (
        <Card
          key={index}
          header={
            <div className={styles.header}>
              <Badge backgroundColor="#FFA928">🦁 프로필</Badge>
              <div className={styles.nicnamePostion}>
                <div className={styles.nickname}>{member.userNickname}</div>
                <div className={styles.label}>
                  {positionMap[member.userPosition] || member.userPosition}
                </div>
              </div>
            </div>
          }
          body={
            <div className={styles.body}>
              <Image
                width={80}
                height={80}
                src={member.userAvatarUrl || '/images/test-team.png'}
                alt="avatar"
                className={styles.imageBox}
              />
            </div>
          }
          footer={
            <div className={styles.skillWrapper}>
              {member.userSkill
                .split(',')
                .map((skill) => skill.trim())
                .filter((skill) => skill.length > 0)
                .map((skill, idx) => (
                  <SkillBadge
                    type="icon"
                    iconLogoSize={30}
                    key={idx}
                    name={skill}
                    label={skill}
                  />
                ))}
            </div>
          }
        />
      ))}
    </div>
  );
};

export default RequestProfilePage;
