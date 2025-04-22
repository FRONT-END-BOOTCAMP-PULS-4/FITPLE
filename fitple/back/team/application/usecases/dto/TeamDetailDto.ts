export class TeamDetailDTO {
  constructor(
    public userNickname: string,
    public userAvatarUrl: string,
    public userPosition: string,
    public userSkill: string
  ) {}
}