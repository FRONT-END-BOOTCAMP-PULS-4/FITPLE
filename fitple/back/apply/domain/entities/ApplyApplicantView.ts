import { ApplyStatus } from "@/type/common";
import { Apply } from "./Apply";
import { Project } from "@/back/project/domain/entities/Project";

export class ApplyApplicantView extends Apply {
    constructor(
        id: number,
        userId: string,
        projectId: number,
        message: string,
        status: ApplyStatus,
        createdAt: Date,
        public project: Partial<Project>,
        public career: number,
        public nickname: string,
        public avatarUrl: string
    ) {
        super(id, userId, projectId, message, status, createdAt);
    }
}
