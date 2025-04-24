import { WorkMode, RecruitmentStatus } from '@/type/common';

export class UpdateIntroductionDto {
    constructor(
        public id: number,
        public title: string,
        public content: string,
        public workMode: WorkMode,
        public status: RecruitmentStatus,
        public skills: number[],
        public positions: number[],
        public images?: string[]
    ) {}
}
