import { Team } from '../entities/Team';

export interface TeamRepository {
    findByUserId(userId: string): Promise<Team[]>;
    create(userId: string, projectId: number): Promise<Team>;
    findByProjectId(projectId: number): Promise<Team>;
}
