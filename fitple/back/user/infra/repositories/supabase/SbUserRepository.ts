import { User } from '@/back/user/domain/entities/User';
import { UserRepository } from '@/back/user/domain/repositories/UserRepository';
import { createClient } from '@/utils/supabase/server';

export class SbUserRepository implements UserRepository {
    async findByTeamId(teamId: string): Promise<User | null> {
        const supabase = await createClient();

        const { data, error } = await supabase.from('user').select('*').eq('team_id', teamId).maybeSingle();

        if (error && error.code !== 'PGRST116') {
            throw new Error(`Error fetching user by team ID: ${error.message}`);
        }

        return data;
    }
    async findByNickname(nickname: string): Promise<User | null> {
        const supabase = await createClient();

        const { data, error } = await supabase.from('user').select('*').eq('nickname', nickname).maybeSingle();

        if (error && error.code !== 'PGRST116') {
            throw new Error(`Error fetching user by nickname: ${error.message}`);
        }
        console.log('nickname 체크', data);
        return data;
    }
    async findByUserSkillId(userSkillId: string): Promise<User | null> {
        const supabase = await createClient();

        const { data, error } = await supabase.from('user').select('*').eq('user_skill_id', userSkillId).maybeSingle();

        if (error && error.code !== 'PGRST116') {
            throw new Error(`Error fetching user by user skill ID: ${error.message}`);
        }

        return data;
    }
    async findByUserPositionId(userPositionId: string): Promise<User | null> {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from('user')
            .select('*')
            .eq('user_position_id', userPositionId)
            .maybeSingle();

        if (error && error.code !== 'PGRST116') {
            throw new Error(`Error fetching user by user skill ID: ${error.message}`);
        }

        return data;
    }
    async findAll(): Promise<User[]> {
        return [] as User[];
    }

    async findById(id: string): Promise<User | null> {
        const supabase = await createClient();

        const { data, error } = await supabase.from('user').select('*').eq('social_client_id', id).maybeSingle();

        if (error && error.code !== 'PGRST116') {
            throw new Error(`Error fetching user by ID: ${error.message}`);
        }

        return data;
    }

    async findByUsername(username: string): Promise<User | null> {
        const supabase = await createClient();

        const { data, error } = await supabase.from('user').select('*').eq('username', username).maybeSingle();

        if (error && error.code !== 'PGRST116') {
            throw new Error(`Error fetching user by username: ${error.message}`);
        }

        return {
            ...data,
            createdAt: data.created_at,
        } as User | null;
    }

    async update(user: User): Promise<User> {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from('users')
            .update(user)
            .eq('nickName', user.nickname)
            .select()
            .maybeSingle();

        if (error) {
            throw new Error(`Error updating user: ${error.message}`);
        }

        if (!data) {
            throw new Error('Failed to retrieve updated user data.');
        }

        return data;
    }

    async save(user: User): Promise<User> {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from('user')
            .insert({
                email: user.email,
                avatar_url: user.avatarUrl,
                nickName: user.nickname,
                career: user.career,
            })
            .select()
            .maybeSingle();

        if (error) {
            throw new Error(`Error saving user: ${error.message}`);
        }

        if (!data) {
            throw new Error('Failed to retrieve saved user data.');
        }

        return data;
    }
}
