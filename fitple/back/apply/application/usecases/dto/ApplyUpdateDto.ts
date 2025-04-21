import { ApplyStatus } from '@/type/common';
export class ApplyUpdateDto {
    constructor(
        public id: number,
        public userId: string,
        public projectId: number,
        public message: string,
        public status: ApplyStatus,
        public createdAt: string
    ) {}
}
