import { ProjectDetailDto } from '@/back/project/application/usecases/dto/ProjectDetailDto';
import { GetProjectDetailUsecase } from '@/back/project/application/usecases/GetProjectDetailUsecase';

import { SbProjectRepository } from '@/back/project/infra/repositories/supabase/SbProjectRepository';
import { NextResponse } from 'next/server';

interface RequestParams {
    params: Promise<{
        id: string;
    }>;
}

/** 누구나 접근 가능한 페이지 */

export async function GET(request: Request, { params }: RequestParams) {
    const { id: projectId } = await params;

    if (!projectId) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    try {
        const projectRepository = new SbProjectRepository();

        const getProjectDetailUsecase = new GetProjectDetailUsecase(projectRepository);

        const projectDetailDto: ProjectDetailDto = await getProjectDetailUsecase.execute(Number(projectId));

        return NextResponse.json(projectDetailDto, { status: 200 });
    } catch (error) {
        console.error('Error fetching project detail:', error);
        return NextResponse.json({ error: 'Failed to fetch project detail' }, { status: 500 });
    }
}
