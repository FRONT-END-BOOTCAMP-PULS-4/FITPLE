import { ApplyStatus } from '@/type/common';
import { Apply } from '../entities/Apply';
import { ApplyView } from '../entities/ApplyView';
import { ApplyApplicantView } from '../entities/ApplyApplicantView';
export interface ApplyRepository {
    updateStatus(id: number, status: ApplyStatus): Promise<void>; // 수락 거절
    createApply(apply: Apply): Promise<Apply>; // 지원할 때 요청 저장

    findApplicants(projectId: number): Promise<ApplyApplicantView[]>; // 내 프로젝트에 지원한 유저들
}
