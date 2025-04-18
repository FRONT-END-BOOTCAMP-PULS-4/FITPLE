import { ApplyStatus } from '@/type/common';
export class ApplyListDto {
    constructor(
        public userId: string,
        public projectId: number,
        public message: string,
        public status: ApplyStatus,
        public createdAt: Date
    ) {}
}
