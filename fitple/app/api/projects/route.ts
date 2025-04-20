import { ProjectListDto } from '@/back/project/application/usecases/dto/ProjectListDto';
import ProjectListUsecase from '@/back/project/application/usecases/ProjectListUsecase';
import { SbProjectRepository } from '@/back/project/infra/repositories/supabase/SbProjectRepository';
import { NextResponse } from 'next/server';

/** 누구나 접근 가능한 페이지 */

export async function GET() {
    try {
        const projectListRepository = new SbProjectRepository();

        const getProjectListUsecase = new ProjectListUsecase(projectListRepository);

        const projectListDto: ProjectListDto[] = await getProjectListUsecase.execute();

        return NextResponse.json(projectListDto, { status: 200 });
    } catch (error) {
        console.error('Error fetching project detail:', error);
        return NextResponse.json({ error: 'Failed to fetch project detail' }, { status: 500 });
    }
}
