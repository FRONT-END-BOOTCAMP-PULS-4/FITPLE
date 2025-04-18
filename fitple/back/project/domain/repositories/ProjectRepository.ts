import { Project } from '../entities/Project';

export interface ProjectRepository {
    findAllProjectList(): Promise<Project[]>; // 프로젝트 전체 리스트 조회
    findProjectById(id: number): Promise<Project>; // 프로젝트 상세 조회
    createProject(project: Project): Promise<Project>; // 프로젝트 생성
    updateProject(project: Project): Promise<Project>; // 프로젝트 수정
    deleteProject(id: number): Promise<void>; // 프로젝트 삭제
    likeProject(projectId: number): Promise<void>; // 좋아요
    unlikeProject(projectId: number): Promise<void>; // 좋아요 취소
}
