"use client";

// import EmblaCarousel from 'embla-carousel';
// import styles from './page.module.scss';
import PopularCarousel from "@/components/Carousel/PopularCarousel/PopularCarousel";
import { EmblaOptionsType } from "embla-carousel";
import Card from "@/components/Card/Card";
import { Tab } from "@/components/Tab/Tab";
import FloatButton from "@/components/FloatButton/FloatButton";
import { introductionPosts, projectPosts } from "@/constants/posts";
import { useRouter } from "next/navigation";
import Badge from "@/components/Badge/Badge";
import styles from "./page.module.scss";
import SkillBadge from "@/components/Badge/SkillBadge";
export default function Home() {
    const router = useRouter();
    const OPTIONS: EmblaOptionsType = {
        // 필요한 Embla 옵션들을 정의
    };
    const allPosts = [...projectPosts, ...introductionPosts];
    const popularPosts = [...allPosts].sort((a, b) => b.likes - a.likes).slice(0, 5); //나중에는 SbProject에서
    const badgeColor = {
        project: "var(--brand-color)",
        introduction: "var(--lion-color)",
    } as const;
    // const { data, error } =
    // await supabase.from('project').select('*').order('likes', { ascending: false }).limit(5); 근데 project랑 introduction 다 가져와서 해야됨;
    const cardsArray = popularPosts.map((post) => (
        <div key={post.id} onClick={() => router.push(`/${post.type}/${post.id}`)} style={{ cursor: "pointer" }}>
            <Card
                header={
                    <div>
                        <span>
                            <Badge size="md" variant="filled" backgroundColor={badgeColor[post.type]}>
                                {post.type === "project" ? "📂 프로젝트" : "🦁 프로필"}
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
    ));
    return (
        <div>
            <PopularCarousel slides={cardsArray} options={OPTIONS} />
            <Tab />
            <FloatButton />
        </div>
    );
}
