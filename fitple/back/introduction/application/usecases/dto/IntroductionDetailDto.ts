import { RecruitmentStatus, WorkMode } from '@/type/common';

export class IntroductionDetailDto {
    constructor(
        public id: number,
        public title: string,
        public content: string,
        public workMode: WorkMode,
        public status: RecruitmentStatus,
        public createdAt: string,
        public updatedAt: string,
        public images: string[] | [],
        public likeCount: number,
        public skills: { id: number; name: string }[],
        public positions: { id: number; name: string }[],
        public user: {
            nickname: string;
            avatarUrl: string;
            career: number;
        }
    ) {}
}
