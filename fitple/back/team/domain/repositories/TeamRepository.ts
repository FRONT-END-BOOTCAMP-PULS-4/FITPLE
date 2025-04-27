import { Team } from '../entities/Team';

export interface TeamRepository {
    findByUserId(userId: string): Promise<Team[]>;
    create(userId: string, projectId: number): Promise<Team>;
    findTeam(projectId: number): Promise<boolean>;
    findByProjectId(userId: string, projectId: number): Promise<Team>;
}
