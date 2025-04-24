import { ApplyRepository } from '@/back/apply/domain/repositories/ApplyRepository';
import { ApplyApplicantDto } from './dto/ApplyApplicantDto';
import dayjs from 'dayjs';

export class ApplyApplicantUsecase {
    constructor(
      private readonly applyRepository: ApplyRepository
    ) {}
  
    async execute(userId: string): Promise<ApplyApplicantDto[]> {
      const myProjectIds = await this.applyRepository.findMyProjectIds(userId);
      const applicants = await this.applyRepository.findApplicants(myProjectIds);
      
      return applicants.map(
        (apply) =>
            new ApplyApplicantDto(
                apply.id,
                apply.userId,
                apply.projectId,
                apply.message,
                apply.status,
                dayjs(apply.createdAt).format('YYYY-MM-DD'),
                apply.user.avatarUrl,
                apply.user.career,
                apply.user.nickname,
                apply.project.title!
            )
      );
    }
  }
  