import { projectPosts } from "@/constants/posts";
import Badge from "../Badge/Badge";
import SkillBadge from "../Badge/SkillBadge";
import Card from "../Card/Card";
import styles from "./ProjectTab.module.scss";
import { useRouter } from "next/navigation";

type Props = {
    selectedOptions: string[];
};

export function ProjectTab({ selectedOptions }: Props) {
    const router = useRouter();
    const filteredPosts =
        selectedOptions.length === 0
            ? projectPosts
            : projectPosts.filter((post) => selectedOptions.some((skill) => post.userSkill.includes(skill)));

    return (
        <div className={styles.project}>
            {filteredPosts.map((post) => (
                <div key={post.id} onClick={() => router.push(`/project/${post.id}`)} style={{ cursor: "pointer" }}>
                    <Card
                        header={
                            <div>
                                <span>
                                    <Badge size="md" variant="filled">
                                        📂 프로젝트
                                    </Badge>
                                </span>
                            </div>
                        }
                        body={
                            <div className={styles.cardBody}>
                                <div className={styles.leftBody}>
                                    <div className={styles.userInfo}>
                                        <h3>{post.nickname}</h3>
                                        <p>{post.userPosition}</p>
                                    </div>
                                    <div className={styles.title}>{post.title}</div>
                                    <div className={styles.skillList}>
                                        {post.userSkill.map((skill) => (
                                            <SkillBadge key={skill} type="icon" name={skill} />
                                        ))}
                                    </div>
                                </div>
                                <div className={styles.rightBody}>
                                    <img src={post.imgUrl} alt="이미지없음" />
                                </div>
                            </div>
                        }
                        footer={`❤️${post.likes}`}
                    />
                </div>
            ))}
        </div>
    );
}
