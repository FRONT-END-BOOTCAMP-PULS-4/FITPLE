export class Team {
  constructor(
    public id: number,
    public user_id: string,
    public project_id: number,
    public created_at: Date,
  ) {}
}