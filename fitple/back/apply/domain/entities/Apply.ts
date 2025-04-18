import { ApplyStatus } from "@/type/common";
export class Apply {
    constructor(
        public user_id: string,
        public project_id: number,
        public message: string,
        public status: ApplyStatus,
        public created_at: Date
    ) {}
}
