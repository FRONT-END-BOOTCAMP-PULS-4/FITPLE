"use client";

import { ProjectListDto } from "@/back/project/application/usecases/dto/ProjectListDto";
import styles from "./ProjectCard.module.scss";
import SkillBadge from "@/components/Badge/SkillBadge";

const ProjectCard = ({ post }: { post: ProjectListDto }) => (
    <div className={styles.container}>
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

export default ProjectCard;
