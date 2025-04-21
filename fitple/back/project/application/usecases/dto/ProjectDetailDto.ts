import { RecruitmentStatus, WorkMode } from '@/type/common';

/** 나중에 user class 타입 지정해주면 됨 */

export class ProjectDetailDto {
    constructor(
        public id: number,
        public userId: string,
        public title: string,
        public content: string,
        public duration: number,
        public workMode: WorkMode,
        public status: RecruitmentStatus,
        public createdAt: string,
        public updatedAt: string,
        public images: string[] | [],
        public likeCount: number,
        public skills:
            | {
                  id: number;
                  name: string;
              }[]
            | [],
        public user: {
            nickname: string;
            avatarUrl: string;
            career: number;
        },
        public positions: {
            id: number;
            name: string;
        }[]
    ) {}
}
