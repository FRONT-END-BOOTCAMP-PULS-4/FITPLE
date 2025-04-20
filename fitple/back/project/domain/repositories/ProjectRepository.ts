import { Project } from '../entities/Project';
import { ProjectDetail } from '../entities/ProjectDetail';
import { ProjectList } from '../entities/ProjectList';

export interface ProjectRepository {
    findProjectById(id: number): Promise<Project>; // 프로젝트 상세 조회
    findProjectByIdView(id: number): Promise<ProjectDetail>; // 프로젝트, 유저정보, 이미지, 좋아요수, 기술스택 (상세페이지)
    findProjectList(): Promise<Project[]>; // 프로젝트 리스트 조회
    findProjectListView(projectIds: number[]): Promise<ProjectList[]>; // 프로젝트, 유저정보, 좋아요수, 기술스택 (리스트조회),

    /** 로그인 한 유저만  */
    createProject(project: Partial<Project>): Promise<Project>; // 새로운 프로젝트 생성
    updateProject(updated: Partial<Project>): Promise<Project>; // 특정 필드 수정
    deleteProject(id: number): Promise<void>; // 삭제 후 반환값 없이 처리
}
