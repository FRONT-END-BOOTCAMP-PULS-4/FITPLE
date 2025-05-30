import { ApplyStatus } from "@/type/common";

export class ApplyListDto {
    constructor(
        public type: "apply",
        public id: number,
        public userId: string,
        public projectId: number,
        public message: string,
        public status: ApplyStatus,
        public createdAt: string,
        public title: string
    ) {}
}
