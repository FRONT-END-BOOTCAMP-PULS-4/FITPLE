import { Team } from '../entities/Team';

export interface TeamRepository {
  findByUserId(userId: string): Promise<Team[]>;
}
