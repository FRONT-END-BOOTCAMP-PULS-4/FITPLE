import { RecruitmentStatus, WorkMode } from '@/type/common';

export class IntroductionListDto {
    constructor(
        public type: 'project' | 'introduction',
        public id: number,
        public userId: string,
        public title: string,
        public content: string,
        public workMode: WorkMode,
        public status: RecruitmentStatus,
        public createdAt: string,
        public updatedAt: string,
        public likeCount: number,
        public daysAgo: number,
        public skills: { id: number; name: string }[],
        public positions: { id: number; name: string }[],
        public user: {
            nickname: string;
            avatarUrl: string;
            career: number;
        }
    ) {}
}
