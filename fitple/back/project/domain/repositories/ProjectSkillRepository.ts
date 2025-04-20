export interface ProjectSkillRepository {
    createProjectSkills(projectId: number, skillIds: number[]): Promise<void>;
    updateProjectSkills(projectId: number, newskillIds: number[]): Promise<void>;
}
