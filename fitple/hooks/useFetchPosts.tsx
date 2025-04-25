import { useEffect, useState } from "react";
import { ProjectListDto } from "@/back/project/application/usecases/dto/ProjectListDto";
import { IntroductionListDto } from "@/back/introduction/application/usecases/dto/IntroductionListDto";

export function useRootPage() {
    const [projects, setProjects] = useState<ProjectListDto[]>([]);
    const [introductions, setIntroductions] = useState<IntroductionListDto[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchPosts = async () => {
            console.log("초기상태: ", isLoading);
            try {
                const [projectsRes, introductionsRes] = await Promise.all([
                    fetch("/api/projects"),
                    fetch("/api/introductions"),
                ]);

                if (!projectsRes.ok || !introductionsRes.ok) {
                    throw new Error(`서버 오류`);
                }

                const projectsData = await projectsRes.json();
                const introductionsData = await introductionsRes.json();

                setProjects(projectsData);
                setIntroductions(introductionsData);
                setIsLoading(false);
            } catch (error) {
                console.error("데이터를 불러오는 중 오류 발생:", error);
                setIsLoading(false); // 에러 발생 시에도 false로 설정
            }
        };
        fetchPosts();
    }, []);
    console.log("fetch 후 상태: ", isLoading);
    return { projects, introductions, isLoading };
}
