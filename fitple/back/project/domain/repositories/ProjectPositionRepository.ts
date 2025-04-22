export interface ProjectPositionRepository {
    createProjectPositions(projectId: number, positionIds: number[]): Promise<void>;
    updateProjectPositions(projectId: number, newPositionIds: number[]): Promise<void>;
    deleteProjectPositions(projectId: number): Promise<void>;
}
