export class CreatedTeamDto {
    constructor(
        public id: number,
        public projectId: number,
        public userId: string,
        public createdAt: Date,
        public message: string
    ) {}
}
