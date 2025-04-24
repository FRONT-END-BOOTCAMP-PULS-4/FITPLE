import { RecruitmentStatus, WorkMode } from '@/type/common';
import { Skill } from '@/back/skill/domain/entities/Skill';
import { Position } from '@/back/position/domain/entities/Position';
import { User } from '@/back/user/domain/entities/User';
import { Introduction } from './Introduction';
import { IntroductionLike } from './IntroductionLike';
import { IntroductionImage } from './IntroductionImage';

export class IntroductionView extends Introduction {
    constructor(
        id: number,
        userId: string,
        title: string,
        content: string,
        status: RecruitmentStatus,
        workMode: WorkMode,
        createdAt: Date,
        updatedAt: Date,
        public user: User,
        public skills: Skill[],
        public positions: Position[],
        public likes: IntroductionLike[],
        public images?: IntroductionImage[]
    ) {
        super(id, userId, title, content, status, workMode, createdAt, updatedAt);
    }
}
