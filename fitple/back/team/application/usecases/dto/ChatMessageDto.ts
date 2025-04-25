export class ChatMessageDto {
    constructor(
        public id: number,
        public team_id: number,
        public user_id: number,
        public message: string,
        public created_at: Date,
    ) {}
}
