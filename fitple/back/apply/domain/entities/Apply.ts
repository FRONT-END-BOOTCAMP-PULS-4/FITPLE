import { ApplyStatus } from '@/type/common';
export class Apply {
    constructor(
        public id: number,
        public userId: string,
        public projectId: number,
        public message: string,
        public status: ApplyStatus,
        public createdAt?: Date
    ) {}
}
