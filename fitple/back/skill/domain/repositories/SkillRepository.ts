// domain/repositories/SkillRepository.ts
import { Skill } from '../entities/Skill';

export interface SkillRepository {
    findAll(): Promise<Skill[]>; // DB 에서 skill 데이터 모두 가져오기
}
