import { ChatMessageRepository } from '@/back/team/domain/repositories/ChatMessageRepository';
import { ChatMessage } from '@/back/team/domain/entities/ChatMessage';
import { ChatMessageDto } from '@/back/team/application/usecases/dto/ChatMessageDto';
import { SendMessageDto } from '@/back/team/application/usecases/dto/SendMessageDto';
import { createClient } from '@/utils/supabase/server';

export class SbChatMessageRepository implements ChatMessageRepository {
  async getMessagesByTeamId(teamId: number): Promise<ChatMessageDto[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('chat_message')
      .select('*')
      .eq('team_id', teamId)
      .order('created_at', { ascending: true });

    if (error || !data) {
      console.log('getMessagesByTeamId Error:', error?.message);
      return [];
    }

    const entities = data.map(item => ChatMessage.fromObject(item));
    return entities.map(entity => new ChatMessageDto(
      entity.id,
      entity.team_id,
      entity.user_id,
      entity.message,
      entity.created_at
    ));
  }

  async sendMessage(data: SendMessageDto): Promise<void> {
    const supabase = await createClient();

    const { error } = await supabase.from('chat_message').insert([
      {
        team_id: data.team_id,
        user_id: data.user_id,
        message: data.message,
      },
    ]);

    if (error) {
      console.log('sendMessage Error:', error.message);
      throw new Error(error.message);
    }
  }
}
