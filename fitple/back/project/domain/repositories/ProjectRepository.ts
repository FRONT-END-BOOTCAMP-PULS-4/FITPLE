import { Project } from '../entities/Project';
import { ProjectView } from '../entities/ProjectView';

export interface ProjectRepository {
    findById(id: number): Promise<ProjectView>; // project 상세조회
    findList(): Promise<ProjectView[]>; // project 리스트 조회

    createProject(project: Partial<Project>): Promise<number>; // project 생성
    updateProject(project: Partial<Project>): Promise<void>; // project 수정
    deleteProject(id: number): Promise<void>; // project 삭제

    findAllByMyProject(userId: string): Promise<Project[]>; // 내 프로젝트 모두 가져오기
}
