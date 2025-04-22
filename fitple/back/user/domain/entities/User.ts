export class User {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public avatarUrl: string,
        public nickname: string,
        public career: number,
        public createdAt: Date,
        public updatedAt: Date
    ) {}
}
