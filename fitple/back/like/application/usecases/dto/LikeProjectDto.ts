import { RecruitmentStatus, WorkMode } from '@/type/common';

export class LikeProjectDto {
    constructor(
        public id: number,
        public createdAt: string,
        public projects: {
            id: number;
            userId: string;
            title: string;
            content: string;
            duration: number;
            status: RecruitmentStatus;
            workMode: WorkMode;
            createdAt: string;
            updatedAt: string;
        }
    ) {}
}
