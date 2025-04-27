import { createClient } from "@/utils/supabase/server";
import { User } from "@/back/user/domain/entities/User";
import { Skill } from "@/back/skill/domain/entities/Skill";
import { Position } from "@/back/position/domain/entities/Position";
import { IntroductionRepository } from "@/back/introduction/domain/repositories/IntroductionRepository";
import { IntroductionView } from "@/back/introduction/domain/entities/IntroductionView";
import { Introduction } from "@/back/introduction/domain/entities/Introduction";
import { IntroductionLike } from "@/back/introduction/domain/entities/IntroductionLike";
import { IntroductionImage } from "@/back/introduction/domain/entities/IntroductionImage";

export class SbIntroductionRepository implements IntroductionRepository {
    async findById(id: number): Promise<IntroductionView> {
        try {
            const supabase = await createClient();

            const { data: introduction, error } = await supabase
                .from("introduction")
                .select(
                    `
                    *,
                    user (
                      id, name, email, avatar_url, nickname, career, social_client_id, created_at, updated_at
                    ),
                    introduction_skill (
                      skill (
                        id, skill_name
                      )
                    ),
                    introduction_position (
                      position (
                        id, position_name
                      )
                    ),
                    introduction_like (
                      user_id, created_at
                    ),
                    introduction_img (
                    id, introduction_id, img_url
                    )
                  `
                )
                .eq("id", id);

            if (error) {
                throw new Error(`Failed to fetch introduction detail: ${error?.message}`);
            }

            const user = new User(
                introduction[0].user.name,
                introduction[0].user.email,
                introduction[0].user.avatarUrl,
                introduction[0].user.nickname,
                introduction[0].user.career,
                introduction[0].user.socialClientId,
                introduction[0].user.id,
                introduction[0].user.createdAt,
                introduction[0].user.updatedAt
            );

            const skills = introduction[0].introduction_skill.map(
                (ps: any) => new Skill(ps.skill.id, ps.skill.skill_name)
            );
            const positions = introduction[0].introduction_position.map(
                (pp: any) => new Position(pp.position.id, pp.position.position_name)
            );
            const likes = introduction[0].introduction_like.map(
                (like: any) => new IntroductionLike(introduction[0].id, like.user_id, like.created_at)
            );
            const images = introduction[0]?.introduction_img.map(
                (img: any) => new IntroductionImage(introduction[0].id, img.id, img.img_url)
            );

            return new IntroductionView(
                introduction[0].id,
                introduction[0].user_id,
                introduction[0].title,
                introduction[0].content,
                introduction[0].status,
                introduction[0].work_mode,
                introduction[0].created_at,
                introduction[0].updated_at,
                user,
                skills,
                positions,
                likes,
                images
            );
        } catch (error) {
            console.error(error);
            throw new Error("Unexpected error occurred while fetching introduction.");
        }
    }

    async findList(): Promise<IntroductionView[]> {
        try {
            const supabase = await createClient();

            const { data: introductions, error } = await supabase.from("introduction").select(
                `
                    *,
                    user (
                      id, name, email, avatar_url, nickname, career, social_client_id, created_at, updated_at
                    ),
                    introduction_skill (
                      skill (
                        id, skill_name
                      )
                    ),
                    introduction_position (
                      position (
                        id, position_name
                      )
                    ),
                    introduction_like (
                      user_id, created_at
                    )
                  `
            );

            if (error) {
                throw new Error(`Failed to fetch introduction detail: ${error?.message}`);
            }

            return introductions.map((introduction: any) => {
                const user = new User(
                    introduction.user.name,
                    introduction.user.email,
                    introduction.user.avatar_url,
                    introduction.user.nickname,
                    introduction.user.career,
                    introduction.user.socialClientId,
                    introduction.user.id,
                    introduction.user.created_at,
                    introduction.user.updated_at
                );

                const skills = (introduction.introduction_skill ?? []).map(
                    (ps: any) => new Skill(ps.skill.id, ps.skill.skill_name)
                );

                const positions = (introduction.introduction_position ?? []).map(
                    (pp: any) => new Position(pp.position.id, pp.position.position_name)
                );

                const likes = (introduction.introduction_like ?? []).map(
                    (like: any) => new IntroductionLike(introduction.id, like.user_id, like.created_at)
                );

                return new IntroductionView(
                    introduction.id,
                    introduction.user_id,
                    introduction.title,
                    introduction.content,
                    introduction.status,
                    introduction.work_mode,
                    introduction.created_at,
                    introduction.updated_at,
                    user,
                    skills,
                    positions,
                    likes
                );
            });
        } catch (error) {
            console.error(error);
            throw new Error("Unexpected error occurred while fetching introduction.");
        }
    }

    /* 생성된 introduction id 를 반환한다 */
    async createIntroduction(introduction: Partial<Introduction>): Promise<number> {
        try {
            const supabase = await createClient();

            const { data, error } = await supabase
                .from("introduction")
                .insert({
                    user_id: introduction.userId,
                    title: introduction.title,
                    content: introduction.content,
                    status: introduction.status,
                    work_mode: introduction.workMode,
                })
                .select("id")
                .single();

            if (error || !data) {
                throw new Error(`Failed to create introduction: ${error?.message}`);
            }

            return data.id;
        } catch (error) {
            console.error(error);
            throw new Error("Unexpected error occurred while fetching introduction.");
        }
    }

    async updateIntroduction(introduction: Partial<Introduction>): Promise<void> {
        try {
            const supabase = await createClient();

            const { error } = await supabase
                .from("introduction")
                .update({
                    title: introduction.title,
                    content: introduction.content,
                    status: introduction.status,
                    work_mode: introduction.workMode,
                })
                .eq("id", introduction.id);

            if (error) {
                throw new Error(`Failed to update introduction: ${error?.message}`);
            }
        } catch (error) {
            console.error(error);
            throw new Error("Unexpected error occurred while fetching introduction.");
        }
    }

    async deleteIntroduction(id: number): Promise<void> {
        try {
            const supabase = await createClient();

            const { error } = await supabase.from("introduction").delete().eq("id", id);

            if (error) {
                throw new Error(`Failed to delete introduction: ${error?.message}`);
            }
        } catch (error) {
            console.error(error);
            throw new Error("Unexpected error occurred while fetching introduction.");
        }
    }

    async checkMyIntroduction(userId: string, introductionId: number): Promise<boolean> {
        try {
            const supabase = await createClient();

            const { data, error } = await supabase
                .from("introduction")
                .select("id")
                .eq("user_id", userId)
                .eq("id", introductionId);

            if (error) {
                throw new Error(`Failed to check my introduction: ${error?.message}`);
            }
            return data.length > 0;
        } catch (error) {
            console.error(error);
            throw new Error("Unexpected error occurred while checking my introduction.");
        }
    }
}
