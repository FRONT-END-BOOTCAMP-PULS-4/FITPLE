import { ApplyStatus } from '@/type/common';

export class ApplyApplicantDto {
    constructor(
        public id: number,
        public userId: string,
        public projectId: number,
        public message: string,
        public status: ApplyStatus,
        public createdAt: string,
        public avatarUrl:string, 
        public career:number, 
        public nickname:string,
        public title:string
    ) {}
}
