import { ApplyStatus } from "@/type/common";
import { Apply } from "../entities/Apply";
import { ApplyApplicantView } from "../entities/ApplyApplicantView";
export interface ApplyRepository {
    updateStatus(id: number, status: ApplyStatus): Promise<void>; // 수락 거절
    createApply(apply: Apply): Promise<Apply>; // 지원할 때 요청 저장

    // 받은 요청 > 프로젝트에 지원한 리스트 완료
    findMyProjectIds(userId: string): Promise<number[]>; // 내 프로젝트들의 ID 가져오기
    findApplicants(projectId: number[]): Promise<ApplyApplicantView[]>; // 내 프로젝트에 지원한 유저들 리스트

    // 보낸 요청 > 내가 지원한 프로젝트 리스트
    // apply 테이블에서 id가 내 id인거만 가져옴
    findMyApplyList(userId: string): Promise<ApplyApplicantView[]>;
}
