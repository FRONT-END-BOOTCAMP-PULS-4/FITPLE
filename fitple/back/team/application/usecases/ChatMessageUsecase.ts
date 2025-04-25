import { ChatMessageRepository } from '@/back/team/domain/repositories/ChatMessageRepository';
import { ChatMessageDto } from '@/back/team/application/usecases/dto/ChatMessageDto';
import { SendMessageDto } from '@/back/team/application/usecases/dto/SendMessageDto';

export class ChatMessageUsecase {
  constructor(private readonly chatMessageRepository: ChatMessageRepository) {}

  async getMessages(teamId: number): Promise<ChatMessageDto[]> {
    return await this.chatMessageRepository.getMessagesByTeamId(teamId);
  }

  async sendMessage(data: SendMessageDto): Promise<void> {
    return await this.chatMessageRepository.sendMessage(data);
  }
}