// back/apply/application/usecases/dto/ApplyCreateDto.ts

import { ApplyStatus } from '@/type/common';

export class ApplyCreateDto {
    constructor(
        public userId: string,
        public projectId: number,
        public message: string,
        public status: ApplyStatus = 'waiting'
    ) // public createdAt: Date
    {}
}
