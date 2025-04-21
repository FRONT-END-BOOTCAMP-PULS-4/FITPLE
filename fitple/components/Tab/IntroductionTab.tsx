import Badge from "../Badge/Badge";
import SkillBadge from "../Badge/SkillBadge";
import Card from "../Card/Card";
import styles from "./IntroductionTab.module.scss";
type IntroductionPost = {
    id: number;
    nickname: string;
    userPosition: string;
    title: string;
    imgUrl: string;
    userSkill: string[];
    likes: number;
};

type Props = {
    selectedOptions: string[];
};
export function IntroductionTab({ selectedOptions }: Props) {
    console.log(selectedOptions);
    const introductionPosts: IntroductionPost[] = [
        {
            id: 1,
            nickname: "디자인하고싶어요",
            userPosition: "디자이너",
            title: "Figma 잘 다루는 디자이너입니다. 협업 원해요!",
            imgUrl: "https://codingapplecdn.com/wp-content/uploads/2023/01/food1.png",
            userSkill: ["spring"],
            likes: 4,
        },
        {
            id: 2,
            nickname: "백엔드지존",
            userPosition: "백엔드",
            title: "Node.js, Supabase 경험 있어요. 같이 해요!",
            imgUrl: "https://codingapplecdn.com/wp-content/uploads/2023/01/food2.png",
            userSkill: ["express", "node"],
            likes: 11,
        },
        {
            id: 3,
            nickname: "개발초보입니다",
            userPosition: "프론트엔드",
            title: "리액트 공부 중인 개발자! 협업하면서 배우고 싶어요!",
            imgUrl: "https://codingapplecdn.com/wp-content/uploads/2023/01/food0.png",
            userSkill: ["React", "mysql", "python"],
            likes: 3,
        },
    ];
    const filteredPosts =
        selectedOptions.length === 0
            ? introductionPosts // 0일 땐 다 보여줌
            : introductionPosts.filter((post) => selectedOptions.some((skill) => post.userSkill.includes(skill)));
    //some : 하나라도 조건을 만족하면 true를 반환해
    return (
        <div className={styles.introduction}>
            {filteredPosts.map((post) => (
                <Card
                    key={post.id}
                    header={
                        <div>
                            <span>
                                <Badge size="md" variant="filled">
                                    프로필
                                </Badge>
                            </span>
                        </div>
                    }
                    body={
                        <div className={styles.cardBody}>
                            <div className={styles.leftBody}>
                                <div className={styles.userInfo}>
                                    <h2>{post.nickname}</h2>
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
                    footer={`${"❤️" + post.likes}`}
                />
            ))}
        </div>
    );
}
