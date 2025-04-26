import { ApplyRepository } from "@/back/apply/domain/repositories/ApplyRepository";
import dayjs from "dayjs";
import { ApplyApplicantDto } from "./dto/ApplyApplicantDto";

export class FindMyApplyListUsecase {
    constructor(private readonly applyRepository: ApplyRepository) {}

    async execute(userId: string): Promise<ApplyApplicantDto[]> {
        const applys = await this.applyRepository.findMyApplyList(userId);
        return applys.map(
            (apply) =>
                new ApplyApplicantDto(
                    "apply",
                    apply.id,
                    apply.userId,
                    apply.projectId,
                    apply.message,
                    apply.status,
                    dayjs(apply.createdAt).format("YYYY-MM-DD"),
                    apply.avatarUrl,
                    apply.career,
                    apply.nickname || "/images/test-team.png",
                    apply.project.title!
                )
        );
    }
}
