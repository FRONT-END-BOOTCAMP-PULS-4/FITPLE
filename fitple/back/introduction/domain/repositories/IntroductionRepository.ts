import { Introduction } from "../entities/Introduction";
import { IntroductionView } from "../entities/IntroductionView";

export interface IntroductionRepository {
    findById(id: number): Promise<IntroductionView>; // Introduction 상세조회
    findList(): Promise<IntroductionView[]>; // Introduction 리스트 조회

    createIntroduction(project: Partial<Introduction>): Promise<number>; // Introduction 생성
    updateIntroduction(project: Partial<Introduction>): Promise<void>; // Introduction 수정
    deleteIntroduction(id: number): Promise<void>; // Introduction 삭제

    checkMyIntroduction(userId: string, introductionId: number): Promise<boolean>; // 내 글인지 확인
}
