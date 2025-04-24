export interface IntroductionSkillRepository {
    createIntroductionSkills(introductionId: number, skillIds: number[]): Promise<void>;
    updateIntroductionSkills(introductionId: number, newskillIds: number[]): Promise<void>;
    deleteIntroductionSkills(introductionId: number): Promise<void>;
}
