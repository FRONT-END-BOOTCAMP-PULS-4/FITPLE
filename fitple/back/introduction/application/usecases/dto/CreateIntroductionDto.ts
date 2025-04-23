import { WorkMode, RecruitmentStatus } from '@/type/common';

export class CreateIntroductiontDto {
    constructor(
        public userId: string,
        public title: string,
        public content: string,
        public workMode: WorkMode,
        public status: RecruitmentStatus,
        public skills: number[],
        public positions: number[],
        public images?: string[] | [],
        public createdAt?: Date,
        public updatedAt?: Date
    ) {}
}
