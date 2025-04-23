// src/back/position/domain/repositories/PositionRepository.ts
import { Position } from '../entities/Position';

export interface PositionRepository {
    findAll(): Promise<Position[]>;
}
