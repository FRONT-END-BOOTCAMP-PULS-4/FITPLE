"use client";

import { IntroductionListDto } from "@/back/introduction/application/usecases/dto/IntroductionListDto";
import SkillBadge from "@/components/Badge/SkillBadge";
import styles from "./IntroductionCard.module.scss";

const IntroductionCard = ({ post }: { post: IntroductionListDto }) => (
    <div className={styles.container}>
        <div className={styles.userInfo}>
            <h4>{post.user.nickname}</h4>
            <p>
                {post.positions.map((position) => (
                    <p key={post.id}>{position.name}</p>
                ))}
            </p>
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
