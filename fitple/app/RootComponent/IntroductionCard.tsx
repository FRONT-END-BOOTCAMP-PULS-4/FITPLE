'use client';

import { IntroductionListDto } from '@/back/introduction/application/usecases/dto/IntroductionListDto';
import SkillBadge from '@/components/Badge/SkillBadge';
import styles from '../page.module.scss';

const IntroductionCard = ({ post }: { post: IntroductionListDto }) => (
    <div className={styles.cardBody}>
        <div className={styles.introLeft}>
            <div className={styles.introUser}>
                <h3>{post.user.nickname}</h3>
                <p>{post.positions.map((p) => p.name).join(', ')}</p>
            </div>
            <div>{post.title}</div>
            <div className={styles.skillList}>
                {post.skills.map((skill) => (
                    <SkillBadge key={skill.id} type="icon" name={skill.name} />
                ))}
            </div>
        </div>
        <div className={styles.introRight}>
            <img src={post.user.avatarUrl || '/images/default-profile.png'} alt="프로필" />
        </div>
    </div>
);

export default IntroductionCard;
