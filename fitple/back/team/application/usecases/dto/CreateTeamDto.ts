export class CreateTeamDto {
    constructor(
        public type: string,
        public receiveUserId: string,
        public projectId: number,
        public applyUserId: string
    ) {}
}
