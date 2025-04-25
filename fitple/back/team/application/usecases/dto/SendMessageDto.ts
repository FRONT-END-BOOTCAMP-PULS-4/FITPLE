export class SendMessageDto {
    constructor(
      public team_id: number,
      public user_id: number,
      public message: string,
    ) {}
  }
  