import { ChatMessageDto } from '@/back/team/application/usecases/dto/ChatMessageDto'
import { SendMessageDto } from '@/back/team/application/usecases/dto/SendMessageDto';

export interface ChatMessageRepository {
  getMessagesByTeamId(teamId: number): Promise<ChatMessageDto[]>;
  sendMessage(data: SendMessageDto): Promise<void>;
}