import { IntroductionRepository } from '../../domain/repositories/IntroductionRepository';

export class DeleteIntroductionUsecase {
    constructor(private introductionRepository: IntroductionRepository) {}

    async execute(id: number): Promise<void> {
        const introductionId = id;

        await this.introductionRepository.deleteIntroduction(introductionId);
    }
}
