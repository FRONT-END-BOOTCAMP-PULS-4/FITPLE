// src/back/position/application/usecases/GetPositionListUsecase.ts
import { PositionRepository } from '../../domain/repositories/PositionRepository';
import { PositionDto } from './dto/PositionDto';

export class GetPositionListUsecase {
    constructor(private positionRepository: PositionRepository) {}

    async execute(): Promise<PositionDto[]> {
        const positions = await this.positionRepository.findAll();
        return positions.map((pos) => new PositionDto(pos.id, pos.positionName));
    }
}
