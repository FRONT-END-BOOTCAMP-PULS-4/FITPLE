import { Like } from "@/back/like/domian/entities/Like";
import { LikeProjectView } from "@/back/like/domian/entities/LikeProjectView";
import { LikeRepository } from "@/back/like/domian/repositories/LikeRepository";
import { Project } from "@/back/project/domain/entities/Project";
import { createClient } from "@/utils/supabase/server";

export class SbLikeRepository implements LikeRepository {
    async findById(projectId: number, userId: string): Promise<Like> {
        try {
            const supabase = await createClient();

            const { data, error } = await supabase
                .from("project_like")
                .select("*")
                .eq("project_id", projectId)
                .eq("user_id", userId)
                .maybeSingle();

            if (error) {
                throw new Error(`Failed to fetch project like data: ${error.message}`);
            }

            return data;
            // return !!data; // data 가 있으면 true, 없으면 false
        } catch (error) {
            console.error(error);
            throw new Error("Unexpected error occurred while fetching like");
        }
    }
    async findAll(userId: string): Promise<LikeProjectView[]> {
        try {
            const supabase = await createClient();

            const { data: projectList, error } = await supabase
                .from("project_like")
                .select("*, project(*)")
                .eq("user_id", userId);

            if (error) {
                console.error("failed to fetch like error:", error.message);
                throw new Error("Error while fetching liked projects");
            }

            return projectList.map((like) => {
                const project = new Project(
                    like.project.id,
                    like.project.user_id,
                    like.project.title,
                    like.project.content,
                    like.project.duration,
                    like.project.status,
                    like.project.work_mode,
                    like.project.created_at,
                    like.project.updated_at
                );

                return new LikeProjectView(like.id, like.project_id, like.user_id, like.created_at, project);
            });
        } catch (error) {
            console.error(error);
            throw new Error("Unexpected error occurred while fetching liked projects");
        }
    }

    async save(projectId: number, userId: string): Promise<void> {
        try {
            const supabase = await createClient();

            const { data, error } = await supabase
                .from("project_like")
                .insert({
                    user_id: userId,
                    project_id: projectId,
                })
                .select("id")
                .single();

            if (error) {
                throw new Error(`Failed to create project like data: ${error.message}`);
            }

            return data.id;
        } catch (error) {
            console.error(error);
            throw new Error("Unexpected error occurred while fetching liked projects");
        }
    }

    async delete(projectId: number, userId: string): Promise<void> {
        try {
            const supabase = await createClient();

            const { error } = await supabase
                .from("project_like")
                .delete()
                .eq("project_id", [projectId])
                .eq("user_id", userId);

            if (error) {
                throw new Error(`Failed to delete project like: ${error?.message}`);
            }
        } catch (error) {
            console.error(error);
            throw new Error("Unexpected error occurred while fetching liked projects");
        }
    }
}
