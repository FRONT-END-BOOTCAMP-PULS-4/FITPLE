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
import { useEffect, useState } from "react";
import { ProjectListDto } from "@/back/project/application/usecases/dto/ProjectListDto";
export default function Home() {
    const router = useRouter();
    const OPTIONS: EmblaOptionsType = {
        // 필요한 Embla 옵션들을 정의
    };
    const badgeColor = {
        project: "var(--brand-color)",
        introduction: "var(--lion-color)",
    } as const;
    // const { data, error } =
    // await supabase.from('project').select('*').order('likes', { ascending: false }).limit(5); 근데 project랑 introduction 다 가져와서 해야됨;

    async function fetchProjects() {
        try {
            const res = await fetch("/api/projects", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                throw new Error(`서버 오류: ${res.status}`);
            }

            const data = await res.json();
            return data;
        } catch (error) {
            console.error("프로젝트 데이터를 불러오는 중 오류 발생:", error);
            return null;
        }
    }
    const [projects, setProjects] = useState<ProjectListDto[]>([]);

    useEffect(() => {
        const getProjects = async () => {
            const data = await fetchProjects();
            if (data) {
                setProjects(data);
            }
        };
        getProjects();
    }, []);
    const popularPosts = projects.sort((a, b) => b.likeCount - a.likeCount).slice(0, 5); //나중에 인트로덕션도해야됨
    const cardsArray = popularPosts.map((post) => (
        <div key={post.id} onClick={() => router.push(`/${post.type}/${post.id}`)} style={{ cursor: "pointer" }}>
            {/* <Card
                header={
                    <div>
                        <span>
                            <Badge
                                size="md"
                                variant="filled"
                                backgroundColor={
                                    badgeColor[post.type as keyof typeof badgeColor] ?? 'var(--gray-color)'
                                }
                            >
                                {post.type === 'project' ? '📂 프로젝트' : '🦁 프로필'}
                            </Badge>
                        </span>
                    </div>
                }
                body={
                    <div className={styles.cardBody}>
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
                            {post.skills.map((skill: { id: number; name: string }) => (
                                <SkillBadge key={skill.id} type="icon" name={skill.name} />
                            ))}
                        </div>
                    </div>
                }
                footer={`❤️ ${post.likeCount}`}
            /> */}
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
