import { Position } from '@/back/position/domain/entities/Position';
import { UserPosition } from './UserPosition';

export class UserPositionView extends UserPosition {
    constructor(userId: string, positionId: number, public position: Position) {
        super(userId, positionId);
    }
}
