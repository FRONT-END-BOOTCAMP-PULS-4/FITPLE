import { UserSkillView } from '@/back/user/domain/entities/UserSkillView';
import { UserSkillRepository } from '@/back/user/domain/repositories/UserSkillRepository';
import { createClient } from '@/utils/supabase/server';

export class SbUserSkillRepository implements UserSkillRepository {
    async findAllByUserId(id: string): Promise<UserSkillView[]> {
        const supabase = await createClient();
        console.log('userSkillRepository findAllByUserId', id);
        const { data, error } = await supabase.from('user_skill').select('*').eq('user_id', id);
        console.log('skilldata', data);
        if (error && error.code !== 'PGRST116') {
            throw new Error(`Error fetching user by ID: ${error.message}`);
        }

        return data;
    }
}
