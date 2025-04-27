import { User } from '../entities/User';
export interface UserRepository {
    findById(id: string): Promise<User | null>;
    findByTeamId(teamId: string): Promise<User | null>;
    findByNickname(nickname: string): Promise<User | null>;
    findByUserSkillId(userSkillId: string): Promise<User | null>;
    findByUserPositionId(userPositionId: string): Promise<User | null>;
    findByOfferId(offerId: string): Promise<string | null>;
    update(user: Partial<User>): Promise<User>;
    create(user: User): Promise<User>;
}
