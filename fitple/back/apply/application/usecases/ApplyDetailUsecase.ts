// import { ApplyRepository } from '../../domain/repositories/ApplyRepository';
// import { ApplyDetailDto } from './dto/ApplyDetailDto';

// export class ApplyDetailUsecase {
//     constructor(private readonly applyRepository: ApplyRepository) {}

//     async execute(id: number): Promise<ApplyDetailDto> {
//         const apply = await this.applyRepository.findById(id);

//         return {
//             id: apply.id,
//             userId: apply.user_id,
//             projectId: apply.project_id,
//             message: apply.message,
//             status: apply.status,
//             createdAt: apply.created_at,
//         };
//     }
// }
