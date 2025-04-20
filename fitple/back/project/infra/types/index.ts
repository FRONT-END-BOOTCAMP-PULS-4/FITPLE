import { RecruitmentStatus, WorkMode } from '@/type/common';

export type Skill = {
    id: number;
    skill_name: string;
};

export type ProjectSkill = {
    skill: Skill;
};

export type Position = {
    id: number;
    position_name: string;
};

export type ProjectPosition = {
    position: Position;
};

export type ProjectLike = {
    id: number;
    user_id: string;
    project_id: number;
    created_at: Date;
};

export type ProjectUser = {
    nickname: string;
    avatar_url: string;
    career: number;
};

export type ProjectImage = {
    img_url: string;
};

export type ProjectWithRelations = {
    id: number;
    user_id: string;
    title: string;
    content: string;
    duration: number;
    work_mode: WorkMode;
    status: RecruitmentStatus;
    created_at: Date;
    updated_at: Date;
    users: ProjectUser;
    project_skill: ProjectSkill[];
    project_position: ProjectPosition[];
    project_like: ProjectLike[];
};

export type ProjectWithDetailRelations = {
    id: number;
    user_id: string;
    title: string;
    content: string;
    duration: number;
    work_mode: WorkMode;
    status: RecruitmentStatus;
    created_at: Date;
    updated_at: Date;
    users: ProjectUser;
    project_skill: ProjectSkill[];
    project_position: ProjectPosition[];
    project_like: ProjectLike[];
    project_img: ProjectImage[];
};
