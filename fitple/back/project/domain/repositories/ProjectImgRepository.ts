export interface ProjectImgRepository {
    createProjectImages(projectId: number, imgUrls: string[]): Promise<void>;
    updateProjectImages(projectId: number, imgUrls: string[]): Promise<void>;
}
