import { ProjectView } from '@/back/project/domain/entities/ProjectView';
import { ProjectRepository } from '@/back/project/domain/repositories/ProjectRepository';
import { createClient } from '@/utils/supabase/server';
import { User } from '@/back/user/domain/entities/User';
import { Skill } from '@/back/skill/domain/entities/Skill';
import { Position } from '@/back/position/domain/entities/Position';
import { ProjectLike } from '@/back/project/domain/entities/ProjectLike';
import { ProjectImage } from '@/back/project/domain/entities/ProjectImage';
import { Project } from '@/back/project/domain/entities/Project';

export class SbProjectRepository implements ProjectRepository {
    async findById(id: number): Promise<ProjectView> {
        try {
            const supabase = await createClient();

            const { data: project, error } = await supabase
                .from('project')
                .select(
                    `
                    *,
                    user (
                      id, name, email, avatar_url, nickname, career, social_client_id, created_at, updated_at
                    ),
                    project_skill (
                      skill (
                        id, skill_name
                      )
                    ),
                    project_position (
                      position (
                        id, position_name
                      )
                    ),
                    project_like (
                      user_id, created_at
                    ),
                    project_img (
                    id, project_id, img_url
                    )
                  `
                )
                .eq('id', id);

            if (error) {
                throw new Error(`Failed to fetch project detail: ${error?.message}`);
            }

            const user = new User(
                project[0].user.name,
                project[0].user.email,
                project[0].user.avatarUrl,
                project[0].user.nickname,
                project[0].user.career,
                project[0].user.socialClientId,
                project[0].user.id,
                project[0].user.createdAt,
                project[0].user.updatedAt
            );

            const skills = project[0].project_skill.map((ps: any) => new Skill(ps.skill.id, ps.skill.skill_name));
            const positions = project[0].project_position.map(
                (pp: any) => new Position(pp.position.id, pp.position.position_name)
            );
            const likes = project[0].project_like.map(
                (like: any) => new ProjectLike(project[0].id, like.user_id, like.created_at)
            );
            const images = project[0]?.project_img.map(
                (img: any) => new ProjectImage(project[0].id, img.id, img.img_url)
            );

            return new ProjectView(
                project[0].id,
                project[0].user_id,
                project[0].title,
                project[0].content,
                project[0].duration,
                project[0].status,
                project[0].work_mode,
                project[0].created_at,
                project[0].updated_at,
                user,
                skills,
                positions,
                likes,
                images
            );
        } catch (error) {
            console.error(error);
            throw new Error('Unexpected error occurred while fetching project.');
        }
    }

    async findList(): Promise<ProjectView[]> {
        try {
            const supabase = await createClient();

            const { data: projects, error } = await supabase.from('project').select(
                `
                    *,
                    user (
                      id, name, email, avatar_url, nickname, career, social_client_id, created_at, updated_at
                    ),
                    project_skill (
                      skill (
                        id, skill_name
                      )
                    ),
                    project_position (
                      position (
                        id, position_name
                      )
                    ),
                    project_like (
                      user_id, created_at
                    )
                  `
            );

            if (error) {
                throw new Error(`Failed to fetch project detail: ${error?.message}`);
            }

            return projects.map((project: any) => {
                const user = new User(
                    project.user.name,
                    project.user.email,
                    project.user.avatar_url,
                    project.user.nickname,
                    project.user.career,
                    project.user.socialClientId,
                    project.user.id,
                    project.user.created_at,
                    project.user.updated_at
                );

                const skills = (project.project_skill ?? []).map(
                    (ps: any) => new Skill(ps.skill.id, ps.skill.skill_name)
                );

                const positions = (project.project_position ?? []).map(
                    (pp: any) => new Position(pp.position.id, pp.position.position_name)
                );

                const likes = (project.project_like ?? []).map(
                    (like: any) => new ProjectLike(project.id, like.user_id, like.created_at)
                );

                return new ProjectView(
                    project.id,
                    project.user_id,
                    project.title,
                    project.content,
                    project.duration,
                    project.status,
                    project.work_mode,
                    project.created_at,
                    project.updated_at,
                    user,
                    skills,
                    positions,
                    likes
                );
            });
        } catch (error) {
            console.error(error);
            throw new Error('Unexpected error occurred while fetching project.');
        }
    }

    /* 생성된 Project id 를 반환한다 */
    async createProject(project: Partial<Project>): Promise<number> {
        try {
            const supabase = await createClient();

            const { data, error } = await supabase
                .from('project')
                .insert({
                    user_id: project.userId,
                    title: project.title,
                    content: project.content,
                    duration: project.duration,
                    status: project.status,
                    work_mode: project.workMode,
                })
                .select('id')
                .single();

            if (error || !data) {
                throw new Error(`Failed to create project: ${error?.message}`);
            }

            return data.id;
        } catch (error) {
            console.error(error);
            throw new Error('Unexpected error occurred while fetching project.');
        }
    }

    async updateProject(project: Partial<Project>): Promise<void> {
        try {
            const supabase = await createClient();

            const { error } = await supabase
                .from('project')
                .update({
                    title: project.title,
                    content: project.content,
                    duration: project.duration,
                    status: project.status,
                    work_mode: project.workMode,
                })
                .eq('id', project.id);

            if (error) {
                throw new Error(`Failed to update project: ${error?.message}`);
            }
        } catch (error) {
            console.error(error);
            throw new Error('Unexpected error occurred while fetching project.');
        }
    }

    async deleteProject(id: number): Promise<void> {
        try {
            const supabase = await createClient();

            const { error } = await supabase.from('project').delete().eq('id', id);

            if (error) {
                throw new Error(`Failed to delete project: ${error?.message}`);
            }
        } catch (error) {
            console.error(error);
            throw new Error('Unexpected error occurred while fetching project.');
        }
    }
}
