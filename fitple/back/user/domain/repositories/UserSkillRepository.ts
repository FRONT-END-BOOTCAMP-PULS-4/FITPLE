import { UserSkillView } from '../entities/UserSkillView';

export interface UserSkillRepository {
    findAllByUserId(id: string): Promise<UserSkillView[]>;
}
