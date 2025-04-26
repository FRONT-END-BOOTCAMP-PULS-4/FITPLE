import { RecruitmentStatus, WorkMode } from '@/type/common';

export class MyProjectDto {
    constructor(
        public id: number,
        public title: string,
        public content: string,
        public duration: number,
        public workMode: WorkMode,
        public status: RecruitmentStatus,
        public createdAt: string,
        public updatedAt: string
    ) {}
}
