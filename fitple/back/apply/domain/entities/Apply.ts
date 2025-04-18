import { ApplyStatus } from "@/type/common";

export type Apply = {
    user_id: string;
    project_id: number;
    message: string;
    status: ApplyStatus;
    created_at: Date;
};
