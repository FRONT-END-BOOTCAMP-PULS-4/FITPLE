import { useRouter } from "next/navigation";
import Badge from "../Badge/Badge";
import SkillBadge from "../Badge/SkillBadge";
import Card from "../Card/Card";
import styles from "./IntroductionTab.module.scss";
import { introductionPosts } from "@/constants/posts";

type Props = {
    selectedOptions: string[];
};
export function IntroductionTab({ selectedOptions }: Props) {
    console.log(selectedOptions);
    const router = useRouter();
    const filteredPosts =
        selectedOptions.length === 0
            ? introductionPosts // 0일 땐 다 보여줌
            : introductionPosts.filter((post) => selectedOptions.some((skill) => post.userSkill.includes(skill)));
    //some : 하나라도 조건을 만족하면 true를 반환해
    return (
        <div className={styles.introduction}>
            {filteredPosts.map((post) => (
                <div
                    key={post.id}
                    onClick={() => router.push(`/introduction/${post.id}`)}
                    style={{ cursor: "pointer" }}
                >
                    <Card
                        header={
                            <div>
                                <span>
                                    <Badge size="md" variant="filled" backgroundColor="var(--lion-color)">
                                        🦁 프로필
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
                        footer={`❤️ ${post.likes}`}
                    />
                </div>
            ))}
        </div>
    );
}
