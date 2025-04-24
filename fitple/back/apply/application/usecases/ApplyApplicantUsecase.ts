import { ApplyRepository } from '@/back/apply/domain/repositories/ApplyRepository';
import { ApplyApplicantDto } from './dto/ApplyApplicantDto';
import dayjs from 'dayjs';

export class GetProjectApplicantsUsecase {
    constructor(private readonly applyRepository: ApplyRepository) {}

    async execute(projectId: number): Promise<ApplyApplicantDto[]> {
        const applicants = await this.applyRepository.findApplicants(projectId);

        return applicants.map(
            (a) =>
                new ApplyApplicantDto(
                    a.id,
                    a.userId,
                    a.projectId,
                    a.message,
                    a.status,
                    dayjs(a.createdAt).format('YYYY-MM-DD'),
                    a.user,
                    a.skills,
                    a.position // ← Dto에선 `positions`로 받아야 하니까 아래처럼 변경할 수도 있음
                )
        );
    }
}
