import { createClient } from '@/utils/supabase/server';
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
            id: data.id,
            userId: data.user_id,
            projectId: data.project_id,
            message: data.message,
            status: data.status,
            createdAt: data.created_at,
        };
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
                id: apply.id,
                user_id: apply.userId,
                project_id: apply.projectId,
                message: apply.message,
                status: apply.status,
                created_at: apply.createdAt, // dto에서 받은 값을 사용해야 함
            })
            .select()
            .single();
        console.log('error: ', error);
        if (error || !data) {
            throw new Error('Failed to save apply');
        }

        return {
            id: data.id,
            userId: data.user_id,
            projectId: data.project_id,
            message: data.message,
            status: data.status,
            createdAt: data.created_at,
        };
    }
}
