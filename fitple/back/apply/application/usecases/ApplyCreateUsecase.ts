// import { ApplyRepository } from '@/back/apply/domain/repositories/ApplyRepository';
// import { Apply } from '@/back/apply/domain/entities/Apply';
// import { ApplyCreateDto } from './dto/ApplyCreateDto';
// import dayjs from 'dayjs';
// export class ApplyCreateUsecase {
//     constructor(private readonly applyRepository: ApplyRepository) {}

//     async execute(applyDto: ApplyCreateDto): Promise<Apply> {
//         const apply = new Apply(
//             applyDto.id,
//             applyDto.userId,
//             applyDto.projectId,
//             applyDto.message,
//             applyDto.status,
//             dayjs(applyDto.createdAt).format('YYYY-MM-DD')
//         );

//         return await this.applyRepository.save(apply);
//     }
// }
