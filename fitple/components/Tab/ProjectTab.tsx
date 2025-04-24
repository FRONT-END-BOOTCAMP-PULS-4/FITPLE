import Badge from "../Badge/Badge";
import SkillBadge from "../Badge/SkillBadge";
import Card from "../Card/Card";
import styles from "./ProjectTab.module.scss";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

type Props = {
    selectedSkills: string[];
    selectedPositions: string[];
};

type Skill = { id: number; name: string };
type Position = { id: number; name: string };

type Project = {
    id: number;
    title: string;
    skills: Skill[];
    positions: Position[];
    likeCount: number;
};

export function ProjectTab({ selectedSkills, selectedPositions }: Props) {
    const [projects, setProjects] = useState<Project[]>([]);
    const router = useRouter();

    const fetchProjects = useCallback(async () => {
        try {
            const res = await fetch("/api/projects");
            if (!res.ok) throw new Error(`서버 오류: ${res.status}`);
            const data = await res.json();
            setProjects(data);
        } catch (error) {
            console.error("프로젝트 데이터를 불러오는 중 오류 발생:", error);
        }
    }, []);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    const filteredProjects = projects.filter((project) => {
        const skillMatch =
            selectedSkills.length === 0 || selectedSkills.some((skill) => project.skills.some((s) => s.name === skill));

        const positionMatch =
            selectedPositions.length === 0 ||
            selectedPositions.some((position) => project.positions.some((p) => p.name === position));

        return skillMatch && positionMatch;
    });

    return (
        <div className={styles.project}>
            {filteredProjects.map((project) => (
                <div
                    key={project.id}
                    onClick={() => router.push(`board/project/${project.id}`)}
                    style={{ cursor: "pointer" }}
                >
                    <Card
                        header={
                            <div>
                                <Badge size="md" variant="filled">
                                    📂 프로젝트
                                </Badge>
                            </div>
                        }
                        body={
                            <div className={styles.cardBody}>
                                <div className={styles.projectTitle}>
                                    <h3>{project.title} 저는 프론트엔드 백엔드 둘다 함</h3>
                                </div>
                                <div className={styles.projectPosition}>
                                    {project.positions.map((position) => (
                                        <Badge key={position.id} size="sm" variant="filled" backgroundColor="#000000">
                                            {position.name}
                                        </Badge>
                                    ))}
                                </div>
                                <div className={styles.skillList}>
                                    {project.skills.map((skill) => (
                                        <SkillBadge key={skill.id} type="icon" name={skill.name} />
                                    ))}
                                </div>
                            </div>
                        }
                        footer={
                            <div className={styles.cardFooter}>
                                <div>❤️ {project.likeCount}</div>
                                <div>1일전</div>
                            </div>
                        }
                    />
                </div>
            ))}
        </div>
    );
}
