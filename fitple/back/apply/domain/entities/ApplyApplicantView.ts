import { ApplyStatus } from '@/type/common';
import { Apply } from './Apply';
import { User } from '@/back/user/domain/entities/User';
import { Project } from '@/back/project/domain/entities/Project';

export class ApplyApplicantView extends Apply {
    constructor(
        id: number,
        userId: string,
        projectId: number,
        message: string,
        status: ApplyStatus,
        createdAt: Date,
        public project: Partial<Project>,
        public user: User,
    ) {
        super(id, userId, projectId, message, status, createdAt);
    }
}
