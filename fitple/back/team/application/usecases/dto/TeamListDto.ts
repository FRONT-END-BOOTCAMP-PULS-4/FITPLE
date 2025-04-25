export class TeamListDTO {
  constructor(
    public id: number,
    public projectId: number,
    public projectTitle: string,
    public avatarUrl: string[],
  ) {}
}
