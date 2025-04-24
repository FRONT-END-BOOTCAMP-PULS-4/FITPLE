import { Like } from '../entities/Like';
import { LikeProjectView } from '../entities/LikeProjectView';

export interface LikeRepository {
    findById(projectId: number, userId: string): Promise<Like>; //  특정 페이지에 좋아요 눌렀는지
    findAll(userId: string): Promise<LikeProjectView[]>; // 찜한 project 리스트 가져오기
    save(projectId: number, userId: string): Promise<void>;
    delete(projectId: number, userId: string): Promise<void>;
}
