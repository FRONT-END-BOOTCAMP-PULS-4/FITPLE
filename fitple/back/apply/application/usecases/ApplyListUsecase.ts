// import dayjs from 'dayjs';
// import { ApplyRepository } from '../../domain/repositories/ApplyRepository';

// import { ApplyListDto } from './dto/ApplyListDto';

// export class ApplyListUsecase {
//     constructor(private readonly applyRepository: ApplyRepository) {}

//     async execute(id: number): Promise<ApplyListDto> {
//         const apply = await this.applyRepository.findById(id);

//         return {
//             id: apply.id,
//             userId: apply.user_id,
//             projectId: apply.project_id,
//             message: apply.message,
//             status: apply.status,
//             createdAt: dayjs(apply.created_at).format('YYYY-MM-DD'),
//         };
//     }
// }
