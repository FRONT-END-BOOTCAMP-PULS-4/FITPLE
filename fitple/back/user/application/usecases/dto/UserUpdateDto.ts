export class UserUpdateDto {
    constructor(
        public nickname: string,
        public career: string,
        public position: string,
        public avatarUrl: string,
        public skills: { id: number; name: string }[],
        public positions: { id: number; name: string }[],
    ) {}
}