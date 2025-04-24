import { ApplyApplicantView } from '@/back/apply/domain/entities/ApplyApplicantView';
import { ApplyRepository } from '@/back/apply/domain/repositories/ApplyRepository';

export class FindMyApplyListUsecase {
    constructor(private readonly applyRepository: ApplyRepository) {}

    async execute(userId: string): Promise<ApplyApplicantView[]> {
        return this.applyRepository.findMyApplyList(userId);
    }
}