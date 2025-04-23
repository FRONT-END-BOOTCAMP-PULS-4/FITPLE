// domain/repositories/SkillRepository.ts
import { Skill } from '../entities/Skill';

export interface SkillRepository {
    findAll(): Promise<Skill[]>;
}
