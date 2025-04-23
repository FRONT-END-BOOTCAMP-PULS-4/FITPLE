import { Skill } from '@/back/skill/domain/entities/Skill';
import { SkillRepository } from '@/back/skill/domain/repositories/SkillRepository';
import { createClient } from '@/utils/supabase/server';

export class SbSkillRepository implements SkillRepository {
    async findAll(): Promise<Skill[]> {
        const supabase = await createClient();
        const { data, error } = await supabase.from('skill').select('*');
        if (error) {
            console.error('Supabase Get Error:', error);
            throw new Error('Failed to Get Skill status');
        }
        return data.map((item) => ({ id: item.id, skillName: item.skill_name }));
    }
}
