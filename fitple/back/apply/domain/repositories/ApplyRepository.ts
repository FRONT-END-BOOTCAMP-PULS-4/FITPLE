import { Apply } from "../entities/Apply";

export interface ApplyRepository {
    findById(id: number): Promise<Apply>;
    findAll(): Promise<Apply[]>;
    save(apply: Apply): Promise<Apply>;
}
