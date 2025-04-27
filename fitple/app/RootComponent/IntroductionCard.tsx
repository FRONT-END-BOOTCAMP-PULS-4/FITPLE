"use client";

import { IntroductionListDto } from "@/back/introduction/application/usecases/dto/IntroductionListDto";
import SkillBadge from "@/components/Badge/SkillBadge";
import styles from "./IntroductionCard.module.scss";

const positionMap: { [key: string]: string } = {
    FE: '프론트엔드',
    BE: '백엔드',
    PM: '프로젝트 매니저',
    DI: '디자이너',
    FS: '풀스택',
};

const IntroductionCard = ({ post }: { post: IntroductionListDto }) => (
    <div className={styles.container}>
        <div className={styles.userInfo}>
            <h4>{post.user.nickname}</h4>
            <div className={styles.positionText}>
                <div>
                    {post.positions
                        .map((position) => positionMap[position.name] || position.name)
                        .join(', ')}
                </div>
            </div>
        </div>
        <div>
            <p>{post.title}</p>
        </div>
        <div className={styles.skillList}>
            {post.skills.map((skill) => (
                <SkillBadge key={skill.id} type="icon" name={skill.name} />
            ))}
        </div>
    </div>
);

export default IntroductionCard;
