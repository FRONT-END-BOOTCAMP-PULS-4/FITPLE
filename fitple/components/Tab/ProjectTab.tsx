import Badge from "../Badge/Badge";
import SkillBadge from "../Badge/SkillBadge";
import Card from "../Card/Card";
import styles from "./ProjectTab.module.scss";

type ProjectPost = {
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

export function ProjectTab({ selectedOptions }: Props) {
    const projectPosts: ProjectPost[] = [
        {
            id: 1,
            nickname: "하랑이입니다",
            userPosition: "프론트엔드",
            title: "프론트엔드 개발자 구합니다zzzzzzㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ",
            imgUrl: "https://codingapplecdn.com/wp-content/uploads/2023/01/food0.png",
            userSkill: ["React", "JavaScript"],
            likes: 9,
        },
        {
            id: 2,
            nickname: "디자인마스터",
            userPosition: "디자이너",
            title: "디자이너와 협업하실 분? UI/UX 경험자 찾습니다!",
            imgUrl: "https://codingapplecdn.com/wp-content/uploads/2023/01/food1.png",
            userSkill: ["kotlin"],
            likes: 5,
        },
        {
            id: 3,
            nickname: "서버는내가",
            userPosition: "백엔드",
            title: "백엔드 개발자 모집 - Node.js, Django 가능하신 분",
            imgUrl: "https://codingapplecdn.com/wp-content/uploads/2023/01/food2.png",
            userSkill: ["mongodb", "django"],
            likes: 17,
        },
        {
            id: 4,
            nickname: "리액트고수될래",
            userPosition: "프론트엔드",
            title: "리액트 스터디 함께 해요! 초보자도 환영!",
            imgUrl: "https://codingapplecdn.com/wp-content/uploads/2023/01/food2.png",
            userSkill: ["React"],
            likes: 21,
        },
        {
            id: 5,
            nickname: "포폴빌더",
            userPosition: "기획자",
            title: "포트폴리오 팀원 모집! 함께 실력 키워요",
            imgUrl: "https://codingapplecdn.com/wp-content/uploads/2023/01/food1.png",
            userSkill: ["nest"],
            likes: 2,
        },
    ];

    const filteredPosts =
        selectedOptions.length === 0
            ? projectPosts
            : projectPosts.filter((post) => selectedOptions.some((skill) => post.userSkill.includes(skill)));

    return (
        <div className={styles.project}>
            {filteredPosts.map((post) => (
                <Card
                    key={post.id}
                    header={
                        <div>
                            <span>
                                <Badge size="md" variant="filled">
                                    프로젝트
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
