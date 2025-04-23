import { RecruitmentStatus, WorkMode } from '@/type/common';
import { Project } from './Project';
import { Skill } from '@/back/skill/domain/entities/Skill';
import { Position } from '@/back/position/domain/entities/Position';
import { ProjectImage } from './ProjectImage';
import { ProjectLike } from './ProjectLike';
import { User } from '@/back/user/domain/entities/User';

export class ProjectView extends Project {
    constructor(
        id: number,
        userId: string,
        title: string,
        content: string,
        duration: number,
        status: RecruitmentStatus,
        workMode: WorkMode,
        createdAt: Date,
        updatedAt: Date,
        public user: User,
        public skills: Skill[],
        public positions: Position[],
        public likes: ProjectLike[],
        public images?: ProjectImage[]
    ) {
        super(id, userId, title, content, duration, status, workMode, createdAt, updatedAt);
    }
}
