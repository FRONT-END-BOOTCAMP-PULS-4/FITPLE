import { Skill } from '../../domain/entities/Skill';
import { SkillRepository } from '../../domain/repositories/SkillRepository';
import { SkillDto } from './dto/SkillDto';

export class GetSkillListUsecase {
    constructor(private skillRepository: SkillRepository) {}

    async execute(): Promise<SkillDto[]> {
        const skills = await this.skillRepository.findAll();
        return skills.map((skill) => new SkillDto(skill.id, skill.skillName));
    }
}
