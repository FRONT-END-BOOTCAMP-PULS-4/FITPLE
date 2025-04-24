export interface IntroductionPositionRepository {
    createIntroductionPositions(introductionId: number, positionIds: number[]): Promise<void>;
    updateIntroductionPositions(introductionId: number, newPositionIds: number[]): Promise<void>;
    deleteIntroductionPositions(introductionId: number): Promise<void>;
}
