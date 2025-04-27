import { ApplyRepository } from "../../domain/repositories/ApplyRepository";

export class FindDuplicatedApplyUsecase {
    constructor(private readonly applyRepository: ApplyRepository) {}

    // 상태 업데이트 및 상세 정보 조회
    async execute(userId: string, projectId: number): Promise<boolean> {
        try {
            const apply = await this.applyRepository.checkMyApply(userId, projectId);
            return apply;
        } catch (error) {
            console.error("Error update apply:", error);
            throw new Error("Failed tot update apply");
        }
    }
}
