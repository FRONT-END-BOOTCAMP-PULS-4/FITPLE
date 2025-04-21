import { WorkMode, RecruitmentStatus } from '@/type/common';

/** 나중에 user 클래스 타입 정의해주면 됨 */

export class ProjectDetail {
    constructor(
        public id: number,
        public userId: string,
        public title: string,
        public content: string,
        public duration: number,
        public workMode: WorkMode,
        public status: RecruitmentStatus,
        public createdAt: Date,
        public updatedAt: Date,
        public user: {
            nickname: string;
            avatarUrl: string;
            career: number;
        },
        public skills: {
            id: number;
            name: string;
        }[],
        public likeCount: number,
        public imgUrl: string[],
        public positions: {
            id: number;
            name: string;
        }[]
    ) {}
}
