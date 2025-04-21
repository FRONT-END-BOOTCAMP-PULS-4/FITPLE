import { Skill } from '@/back/skill/domain/entities/Skill';
import { UserSkill } from './UserSkill';

export class UserSkillView extends UserSkill {
    constructor(id: number, userId: string, skillId: number, public skill: Skill) {
        super(id, userId, skillId);
    }
}
