import { ApplyStatus } from '@/type/common';
import { Apply } from '../entities/Apply';

export interface ApplyRepository {
    findById(id: number): Promise<Apply>; // 받은 요청에서 상세 볼 때
    findApplicantsByProjectId(projectId: number): Promise<Apply[]>; //내 프로젝트에 지원한 사람들의 프로필 리스트 뽑기
    findApplicationsByUserId(userId: string): Promise<Apply[]>; //내가 지원한 프로젝트 리스트 뽑기
    updateStatus(id: number, status: ApplyStatus): Promise<void>; // 수락 거절
    save(apply: Apply): Promise<Apply>; // 지원할 때 요청 저장
}
