import { ApplyStatus } from '@/type/common';
import { Apply } from './Apply';
import { User } from '@/back/user/domain/entities/User';
import { Position, Skill } from '@/back/project/infra/types';

export class ApplyApplicantView extends Apply {
    constructor(
        id: number,
        userId: string,
        projectId: number,
        message: string,
        status: ApplyStatus,
        createdAt: Date,
        public user: User,
        public skills: Skill[],
        public position: Position[]
    ) {
        super(id, userId, projectId, message, status, createdAt);
    }
}
