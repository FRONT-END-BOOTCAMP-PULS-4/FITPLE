export class SocialLogInDto {
    constructor(public provider: string, public authCode: string) {}
}
