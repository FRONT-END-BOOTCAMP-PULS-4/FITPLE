import { createClient } from '@/utils/supabase/client';
import { Apply } from '../../../domain/entities/Apply';
import { ApplyRepository } from '../../../domain/repositories/ApplyRepository';
import { ApplyStatus } from '@/type/common';

export class SbApplyRepository implements ApplyRepository {
    async findById(id: number): Promise<Apply> {
        const supabase = await createClient();
        const { data, error } = await supabase.from('apply').select().eq('id', id).single();

        if (error || !data) {
            throw new Error('Apply not found');
        }

        return {
            user_id: data.user_id,
            project_id: data.project_id,
            message: data.message,
            status: data.status,
            created_at: data.created_at,
        };
    }

    async findApplyProjectList(projectId: number): Promise<Apply[]> {
        const supabase = await createClient();
        const { data, error } = await supabase.from('apply').select().eq('project_id', projectId);

        if (error) {
            throw new Error('Failed to fetch applies for the project');
        }

        return data.map((a) => ({
            user_id: a.user_id,
            project_id: a.project_id,
            message: a.message,
            status: a.status,
            created_at: a.created_at,
        }));
    }   

    async findApplyProfileList(userId: string): Promise<Apply[]> {
        const supabase = await createClient();
        const { data, error } = await supabase.from('apply').select().eq('user_id', userId);

        if (error) {
            throw new Error('Failed to fetch applies by user');
        }

        return data.map((a) => ({
            user_id: a.user_id,
            project_id: a.project_id,
            message: a.message,
            status: a.status,
            created_at: a.created_at,
        }));
    }

    async updateStatus(id: number, status: ApplyStatus): Promise<void> {
        const supabase = await createClient();
        const { error } = await supabase.from('apply').update({ status }).eq('id', id);

        if (error) {
            throw new Error('Failed to update apply status');
        }
    }

    async save(apply: Apply): Promise<Apply> {
        const supabase = await createClient();
        const { data, error } = await supabase
          .from('apply')
          .insert({
            user_id: apply.user_id,
            project_id: apply.project_id,
            message: apply.message,
            status: apply.status,
            created_at: apply.created_at, // dto에서 받은 값을 사용해야 함
          })
          .select()
          .single();
          console.log("error: ", error);
        if (error || !data) {
          throw new Error('Failed to save apply');
        }
      
        return {
          user_id: data.user_id,
          project_id: data.project_id,
          message: data.message,
          status: data.status,
          created_at: data.created_at,
        };
      }
      
}
