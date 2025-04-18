import { WorkMode, RecruitmentStatus } from '@/type/common';

export class Project {
    constructor(
        public id: number,
        public user_id: string,
        public title: string,
        public content: string,
        public duration: number,
        public work_mode: WorkMode,
        public status: RecruitmentStatus,
        public created_at: Date,
        public updated_at: Date
    ) {}
}
