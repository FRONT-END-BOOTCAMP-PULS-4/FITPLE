export class UserPayload {
    constructor(
        public id: string,
        public nickname: string,
        public career: number,
        public email: string,
        public skills: string[],
        public position: string,
        public avatarUrl: string,
        public socialClientId: string
    ) {}
}

export class SocialLoggedInDto {
    constructor(public token: string, public payload: UserPayload) {}
}
