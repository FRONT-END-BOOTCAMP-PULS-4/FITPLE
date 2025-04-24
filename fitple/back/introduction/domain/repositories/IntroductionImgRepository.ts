export interface IntroductionImgRepository {
    createIntroductionImages(introductionId: number, imgUrls: string[]): Promise<void>;
    updateIntroductionImages(introductionId: number, imgUrls: string[]): Promise<void>;
    deleteIntroductionImages(introductionId: number): Promise<void>;
}
