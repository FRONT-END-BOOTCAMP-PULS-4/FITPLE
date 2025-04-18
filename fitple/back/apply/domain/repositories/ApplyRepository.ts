import { ApplyStatus } from '@/type/common';
import { Apply } from '../entities/Apply';

export interface ApplyRepository {
    findById(id: number): Promise<Apply>; // 받은 요청에서 상세 볼 때
    findApplyProjectList(projectId: number): Promise<Apply[]>; // 받은 요청 탭에서 프로필 리스트 가져옴( 프로젝트는 offer에서 가져옴)
    findApplyProfileList(userId: string): Promise<Apply[]>; // 보낸 요청 탭에서 프로젝트 리스트 가져옴( 프로필은 offer에서 가져옴)
    updateStatus(id: number, status: ApplyStatus): Promise<void>; // 수락 거절
    save(apply: Apply): Promise<Apply>; // 지원할 때 요청 저장
}
