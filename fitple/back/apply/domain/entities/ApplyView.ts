import { ApplyStatus } from '@/type/common';
import { Apply } from './Apply';
import { User } from '@/back/user/domain/entities/User';
import { UserSkill } from '@/back/user/domain/entities/UserSkill';
import { UserPosition } from '@/back/user/domain/entities/UserPosition';
export class ApplyView extends Apply {
    constructor(
        id: number,
        userId: string,
        projectId: number,
        message: string,
        status: ApplyStatus,
        createdAt: Date,
        public user: User,
        public userSkill: UserSkill,
        public userPosition: UserPosition
    ) {
        super(id, userId, projectId, message, status, createdAt);
    }
}
