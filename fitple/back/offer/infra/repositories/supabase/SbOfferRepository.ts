/* eslint-disable @typescript-eslint/no-explicit-any */
import { Introduction } from "@/back/introduction/domain/entities/Introduction";
import { Offer } from "@/back/offer/domain/entities/Offer";
import { OfferView } from "@/back/offer/domain/entities/OfferView";
import { OfferRepository } from "@/back/offer/domain/repositories/OfferRepository";
import { Project } from "@/back/project/domain/entities/Project";
import { User } from "@/back/user/domain/entities/User";
import { OfferStatus } from "@/type/common";
import { createClient } from "@/utils/supabase/server";

export class SbOfferRepository implements OfferRepository {
    async updateStatus(id: number, status: OfferStatus): Promise<void> {
        const supabase = await createClient();
        const { error } = await supabase.from("offer").update({ status }).eq("id", id);

        if (error) {
            console.error("Supabase Update Error:", error);
            throw new Error("Failed to update offer status");
        }
    }
    async save(offer: Offer): Promise<Offer> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("offer")
            .insert({
                id: offer.id,
                user_id: offer.userId,
                project_id: offer.projectId,
                introduction_id: offer.introductionId,
                message: offer.message,
                status: offer.status,
                created_at: offer.createdAt, // dto에서 받은 값을 사용해야 함
            })
            .select()
            .single();
        console.log("error: ", error);
        if (error || !data) {
            throw new Error("Failed to save offer");
        }

        return {
            id: data.id,
            userId: data.user_id,
            projectId: data.project_id,
            introductionId: data.introduction_id,
            message: data.message,
            status: data.status,
            createdAt: data.created_at,
        };
    }
    async findMyIntroductionIds(userId: string): Promise<number[]> {
        const supabase = await createClient();
        const { data, error } = await supabase.from("introduction").select("id").eq("user_id", userId);
        if (error) {
            throw new Error(error.message);
        }
        const ids = data.map((data) => data.id);
        return ids;
    }
    async findReceivedOfferList(introductionIds: number[]): Promise<OfferView[]> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("offer")
            .select(
                `
                id, project_id, introduction_id, message, status, created_at,
                project (
                    title
                ),
                introduction (
                    title
                ),
                user (
                    nickname, avatar_url
                )
                `
            )
            .in("introduction_id", introductionIds);
        if (error || !data) {
            throw new Error(error.message);
        }

        return data.map((offer: any) => {
            // const user: Partial<User> = {
            //     nickname: offer.user?.nickname,
            //     avatarUrl: offer.user?.avatar_url,
            // };
            const project: Partial<Project> = {
                title: offer.project.title,
            };

            const introduction: Partial<Introduction> = {
                id: offer.introduction?.id,
            };
            return new OfferView(
                offer.id,
                offer.userId,
                offer.project_id,
                offer.introduction_id,
                offer.message,
                offer.status,
                offer.created_at,
                project,
                introduction,
                offer.nickname,
                offer.avatar_url
            );
        });
    }
    async findSentOfferList(userId: string): Promise<OfferView[]> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("offer")
            .select(
                `
                    id, user_id, project_id, introduction_id, message, status, created_at,
                    project ( title ),
                    introduction (
                        id,
                        user (
                            nickname, avatar_url
                        )
                    )
                `
            )
            .eq("user_id", userId);
        if (error || !data) {
            throw new Error(error.message);
        }

        return data.map((offer: any) => {
            const user: Partial<User> = {
                nickname: offer.introduction.user?.nickname,
                avatarUrl: offer.introduction.user?.avatar_url,
            };
            const project: Partial<Project> = {
                title: offer.project?.title,
            };
            const introduction: Partial<Introduction> = {
                id: offer.introduction?.id,
            };

            return new OfferView(
                offer.id,
                offer.user_id,
                offer.project_id,
                offer.introduction_id,
                offer.message,
                offer.status,
                new Date(offer.created_at),
                project,
                introduction,
                user.nickname!,
                user.avatarUrl!
            );
        });
    }
    async checkMyOffer(introductionId: number, projectId: number): Promise<boolean> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("offer")
            .select("id")
            .eq("introduction_id", introductionId)
            .eq("project_id", projectId);
        if (error) {
            throw new Error(error.message || "Failed to fetch offer list");
        }
        return data.length > 0;
    }
}
