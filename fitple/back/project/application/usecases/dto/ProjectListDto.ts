import { RecruitmentStatus, WorkMode } from '@/type/common';

export class ProjectListDto {
    constructor(
        public id: number,
        public userId: string,
        public title: string,
        public content: string,
        public duration: number,
        public workMode: WorkMode,
        public status: RecruitmentStatus,
        public createdAt: string,
        public updatedAt: string,
        public skills: {
            id: number;
            name: string;
        }[],
        public likeCount: number,
        public user: {
            nickname: string;
            avatarUrl: string;
            career: number;
        },
        public positions: {
            id: number;
            name: string;
        }[]
    ) {}
}
