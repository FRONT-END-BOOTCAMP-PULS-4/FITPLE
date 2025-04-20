import { ApplyRepository } from '../../domain/repositories/ApplyRepository';
import { ApplyStatus } from '@/type/common';
import { ApplyDetailDto } from './dto/ApplyDetailDto';

export class ApplyDetailUsecase {
    constructor(private readonly applyRepository: ApplyRepository) {}

    // 상태 업데이트 및 상세 정보 조회
    async execute(id: number, status: ApplyStatus): Promise<ApplyDetailDto> {
        // 먼저 해당 지원 요청을 찾아옵니다.
        const apply = await this.applyRepository.findById(id);
        // 상태 업데이트
        await this.applyRepository.updateStatus(id, status);

        // 상태가 업데이트된 후, 업데이트된 apply를 반환합니다.
        return {
            userId: apply.user_id,
            projectId: apply.project_id,
            message: apply.message,
            status: status, // 업데이트된 상태를 반환
            createdAt: apply.created_at,
        };
    }
}
