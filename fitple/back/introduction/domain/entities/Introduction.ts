import { WorkMode, RecruitmentStatus } from '@/type/common';

export class Introduction {
    constructor(
        public id: number,
        public userId: string,
        public title: string,
        public content: string,
        public status: RecruitmentStatus,
        public workMode: WorkMode,
        public createdAt?: Date,
        public updatedAt?: Date
    ) {}
}
