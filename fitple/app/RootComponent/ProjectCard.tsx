'use client';

import { ProjectListDto } from '@/back/project/application/usecases/dto/ProjectListDto';
import Badge from '@/components/Badge/Badge';
import SkillBadge from '@/components/Badge/SkillBadge';
import styles from '../page.module.scss';

const ProjectCard = ({ post }: { post: ProjectListDto }) => (
    <div className={`${styles.cardBody} ${styles.projectCard}`}>
        <div className={styles.projectInfo}>
            <h3>{post.title}</h3>
        </div>
        <div className={styles.projectPosition}>
            {post.positions.map((position) => (
                <Badge key={position.id} size="sm" variant="filled" backgroundColor="#000000">
                    {position.name}
                </Badge>
            ))}
        </div>
        <div className={styles.skillList}>
            {post.skills.map((skill) => (
                <SkillBadge key={skill.id} type="icon" name={skill.name} />
            ))}
        </div>
    </div>
);

export default ProjectCard;
