import { Like } from './Like';
import { Project } from '@/back/project/domain/entities/Project';

export class LikeProjectView extends Like {
    constructor(id: number, userId: string, projectId: number, createdAt: Date, public project: Project) {
        super(id, userId, projectId, createdAt);
    }
}
