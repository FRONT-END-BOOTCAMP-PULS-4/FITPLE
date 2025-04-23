import { UserPositionView } from '../entities/UserPositionView';

export interface UserPositionRepository {
    findByUserId(id: string): Promise<UserPositionView>;
}
