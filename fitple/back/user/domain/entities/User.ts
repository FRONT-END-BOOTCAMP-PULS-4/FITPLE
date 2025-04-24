export class User {
    constructor(
        public name: string,
        public email: string,
        public avatarUrl: string,
        public nickname: string,
        public career: number,
        public socialClientId: string,
        public id?: string,
        public createdAt?: Date,
        public updatedAt?: Date
    ) {}
}
