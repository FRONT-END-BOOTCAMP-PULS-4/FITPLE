/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "@/utils/supabase/server";
import { Apply } from "../../../domain/entities/Apply";
import { ApplyRepository } from "../../../domain/repositories/ApplyRepository";
import { ApplyStatus } from "@/type/common";
import { ApplyApplicantView } from "@/back/apply/domain/entities/ApplyApplicantView";
import { User } from "@/back/user/domain/entities/User";
import { Project } from "@/back/project/domain/entities/Project";

export class SbApplyRepository implements ApplyRepository {
    async findById(id: number): Promise<Apply> {
        const supabase = await createClient();
        const { data, error } = await supabase.from("apply").select().eq("id", id).single();

        if (error || !data) {
            throw new Error("Apply not found");
        }
        return {
            id: data.id,
            userId: data.user_id,
            projectId: data.project_id,
            message: data.message,
            status: data.status,
            createdAt: data.created_at,
        };
    }

    async updateStatus(id: number, status: ApplyStatus): Promise<void> {
        const supabase = await createClient();
        const { error } = await supabase.from("apply").update({ status }).eq("id", id);

        if (error) {
            throw new Error("Failed to update apply status");
        }
    }

    async createApply(apply: Apply): Promise<Apply> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("apply")
            .insert({
                id: apply.id,
                user_id: apply.userId,
                project_id: apply.projectId,
                message: apply.message,
                status: apply.status,
                created_at: apply.createdAt, // dto에서 받은 값을 사용해야 함
            })
            .select()
            .single();
        if (error || !data) {
            throw new Error("Failed to save apply");
        }

        return {
            id: data.id,
            userId: data.user_id,
            projectId: data.project_id,
            message: data.message,
            status: data.status,
            createdAt: data.created_at,
        };
    }
    async findMyProjectIds(userId: string): Promise<number[]> {
        const supabase = await createClient();
        const { data, error } = await supabase.from("project").select("id").eq("user_id", userId);
        if (error) {
            throw new Error(error.message);
        }
        const ids = data.map((data) => data.id);
        return ids;
    }
    async findApplicants(projectIds: number[]): Promise<ApplyApplicantView[]> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("apply")
            .select(
                `
                id, user_id, project_id, message, status, created_at,
                user (
                    id, name, email, avatar_url, nickname, career, created_at, updated_at
                ),
                project (
                    title
                )
                `
            )
            .in("project_id", projectIds);
        if (error || !data) {
            throw new Error("Failed to fetch applicants");
        }

        const applicants = data.map((apply: any) => {
            const user: Partial<User> = {
                nickname: apply.user.nickname,
                avatarUrl: apply.user.avatar_url,
            };
            const project: Partial<Project> = {
                title: apply.project.title,
            };

            return new ApplyApplicantView(
                apply.id,
                apply.user_id,
                apply.project_id,
                apply.message,
                apply.status,
                apply.created_at,
                project,
                user.career!,
                user.nickname!,
                user.avatarUrl!
            );
        });

        return applicants;
    }
    async findMyApplyList(userId: string): Promise<ApplyApplicantView[]> {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from("apply")
            .select(
                `
                id, user_id, project_id, message, status, created_at,
                user (
                    id, name, email, avatar_url, nickname, career, created_at, updated_at
                ),
                project (
                    title
                )
            `
            )
            .eq("user_id", userId);
        if (error || !data) {
            throw new Error(error.message || "Failed to fetch apply list");
        }

        return data.map((apply: any) => {
            const user: Partial<User> = {
                avatarUrl: apply.user.avatar_url,
                nickname: apply.user.nickname,
            };

            const project: Partial<Project> = {
                title: apply.project.title,
            };

            return new ApplyApplicantView(
                apply.id,
                apply.user_id,
                apply.project_id,
                apply.message,
                apply.status,
                apply.created_at,
                project,
                user.career!,
                user.nickname!,
                user.avatarUrl!
            );
        });
    }
}
