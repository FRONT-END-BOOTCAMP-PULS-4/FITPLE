// import { OfferStatus } from "@/type/common";
import { OfferStatus } from "@/type/common";
import { Offer } from "../entities/Offer";
import { OfferView } from "../entities/OfferView";

export interface OfferRepository {
    updateStatus(id: number, status: OfferStatus): Promise<void>; // 수락 거절
    save(offer: Offer): Promise<Offer>; // 저장
    //내 인트로덕션 id가 필요한건데 문제는 introduction id를 가져올 수단이 없음
    //그러면 어떻게하냐 userId를 매개변수로 넘겨줘서 introduction 테이블에서 userId가 내거인 introduction만 가져옴
    //introduction_id를 배열로 만들어서 그걸 findReceivedOfferList에 introductionId로 넘겨주면 이제 조회가 가능하다

    // 받은 요청 > 내 인트로덕션에 제안이 옴
    findMyIntroductionIds(userId: string): Promise<number[]>;
    findReceivedOfferList(introductionId: number[]): Promise<OfferView[]>;

    // 보낸 요청 > 내가 제안한 프로젝트 리스트(상세 들어가면 유저)
    findSentOfferList(userId: string): Promise<OfferView[]>;

    checkMyOffer(introductionId: number, projectId: number): Promise<boolean>; // 제안한 프로젝트가 있는지 확인
}
