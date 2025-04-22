import { User } from '../entities/User';
export interface UserRepository {
    findById(id: string): Promise<User | null>;
    findByTeamId(teamId: string): Promise<User | null>;
    findByNickname(nickname: string): Promise<User | null>;
    findByUserSkillId(userSkillId: string): Promise<User | null>;
    findByUserPositionId(userPositionId: string): Promise<User | null>;
    update(user: Partial<User>): Promise<User>;
    save(user: User): Promise<User>;
}
