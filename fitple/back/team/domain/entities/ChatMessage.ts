export class ChatMessage {
    constructor(
      public id: number,
      public team_id: number,
      public user_id: number,
      public message: string,
      public created_at: Date,
    ) {}
  
    static fromObject(obj: any): ChatMessage {
      return new ChatMessage(
        obj.id,
        obj.team_id,
        obj.user_id,
        obj.message,
        new Date(obj.created_at)
      );
    }
  }
  