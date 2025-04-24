import { User } from '@/back/user/domain/entities/User';
import { ApplyStatus } from '@/type/common';

export class ApplyApplicantDto {
    constructor(
        public id: number,
        public userId: string,
        public projectId: number,
        public message: string,
        public status: ApplyStatus,
        public createdAt: string,
        public user: User,
        public skills: { id: number; name: string }[],
        public positions: { id: number; name: string }[]
    ) {}
}
