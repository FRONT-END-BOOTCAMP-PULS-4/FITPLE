import { Team } from '@/back/team/domain/entities/Team';
import { TeamRepository } from '@/back/team/domain/repositories/TeamRepository';
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
export class SbTeamRepository implements TeamRepository {
    async findByUserId(userId: string): Promise<Team[]> {
        const supabase = await createClient();

        const { data, error } = await supabase.from('team').select('*').eq('user_id', userId);

        if (error || !data) {
            console.log('findByUserId Error:', error.message);
            return [];
        }

        if (!data) return [];

        return data.map((item) => new Team(item.id, item.user_id, item.project_id, new Date(item.created_at)));
    }
    async create(userId: string, projectId: number): Promise<Team> {
        const supabase = await createClient();

        const { data, error } = await supabase.from('team').insert([{ project_id: projectId, user_id: userId }]);

        if (error) {
            throw new Error(`팀 추가 실패: ${error.message}`);
        }

        return NextResponse.json({ message: '팀 추가 성공', data }, { status: 201 });
    }
    async findTeam(projectId: number): Promise<boolean> {
        const supabase = await createClient();

        const { data, error } = await supabase.from('team').select('*').eq('project_id', projectId);

        if (error) {
            throw new Error(`Error fetching team by project ID: ${error.message}`);
        }
        console.log('findTeam data', data);
        if (data.length === 0) {
            return false;
        }

        return true;
    }

    async findByProjectId(userId: string, projectId: number): Promise<Team> {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from('team')
            .select('*')
            .eq('project_id', projectId)
            .eq('user_id', userId)
            .maybeSingle();

        if (error) {
            throw new Error(`Error fetching team by project ID: ${error.message}`);
        }

        return data;
    }
}
