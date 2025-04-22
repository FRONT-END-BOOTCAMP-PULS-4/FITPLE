// import { OfferStatus } from "@/type/common";
import { OfferStatus } from '@/type/common';
import { Offer } from '../entities/Offer';

export interface OfferRepository {
    findById(id: number): Promise<Offer>; // 상세 볼 때
    // findOfferFromProjectList(projectId: number): Promise<Offer[]>; // 받은 요청 탭에서 프로젝트 리스트 가져옴( 프로필은 apply에서 가져옴)
    // findOfferToProfileList(userId: string): Promise<Offer[]>; // 보낸 요청 탭에서 프로필 리스트 가져옴( 프로젝트는 apply에서 가져옴)
    updateStatus(id: number, status: OfferStatus): Promise<void>; // 수락 거절
    save(offer: Offer): Promise<Offer>; // 저장
}
