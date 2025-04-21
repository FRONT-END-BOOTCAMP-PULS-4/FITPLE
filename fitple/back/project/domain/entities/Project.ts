import { WorkMode, RecruitmentStatus } from '@/type/common';

export class Project {
    constructor(
        public id: number,
        public userId: string,
        public title: string,
        public content: string,
        public duration: number,
        public workMode: WorkMode,
        public status: RecruitmentStatus,
        public createdAt: Date,
        public updatedAt: Date
    ) {}
}
