export class UserPayload {
    constructor(
        public id: string | null,
        public nickname: string | null,
        public career: number | null,
        public email: string | null,
        public skills: string[] | null,
        public position: string | null,
        public avatarUrl: string,
        public socialClientId: string
    ) {}
}

export class SocialLoggedInDto {
    constructor(public token: string, public payload: UserPayload) {}
}
