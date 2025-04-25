'use client';

import styles from './ProjectForm.module.scss';
import { useForm } from 'react-hook-form';
import { RecruitmentStatus, WorkMode } from '@/type/common';
import Label from '@/components/Input/Label';
import SelectBox from '@/components/Select/SelectBox';
import Textarea from '@/components/Textarea/Textarea';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import SelectWorkMode from '../../components/SelectWorkMode';
import SelectStatus from '../../components/SelectStatus';
import SelectDuration from '../../components/SelectDuration';
import { useStaticDataStore } from '@/stores/useStaticStore';
import { postProject } from '../service/postProjectService';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'next/navigation';

export type ProjectFormData = {
    title: string;
    content: string;
    positionIds: number[];
    skillIds: number[];
    workMode: WorkMode;
    status: RecruitmentStatus;
    duration: number;
    imgFile?: File | null;
};

/** 여기서 수정이라면, 기존 데이터 가져와서 보여주기 */

const ProjectForm = () => {
    const { register, handleSubmit, setValue, watch } = useForm<ProjectFormData>({
        mode: 'onSubmit',
    });
    const { skills, positions } = useStaticDataStore();
    const selectedPositions = watch('positionIds') || [];
    const selectedSkills = watch('skillIds') || [];
    const router = useRouter();

    const { token } = useAuthStore();

    const onSubmit = async (data: ProjectFormData) => {
        const params = {
            title: data.title,
            content: data.content,
            duration: data.duration,
            workMode: data.workMode,
            status: data.status,
            skillIds: data.skillIds,
            positionIds: data.positionIds,
        };

        try {
            const result = await postProject(token!, params);

            if (result) router.push('/');
        } catch (error) {
            console.error(error);
            /** 나중에 모달이나 토스트 알람 띄우기 */
            alert('게시글 작성에 실패했습니다. 잠시 후 다시 시도해주세요.');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.layout}>
            <Input variant="underline" placeholder="제목을 입력해주세요" {...register('title', { required: true })} />

            <div className={styles.selectBox}>
                <SelectWorkMode register={register} setValue={setValue} />
                <SelectStatus register={register} setValue={setValue} />
                <SelectDuration register={register} setValue={setValue} />

                <Label label="모집포지션" direction="row">
                    <SelectBox
                        {...register('positionIds', { required: true })}
                        options={positions}
                        selectedValues={selectedPositions}
                        onChange={(value) => setValue('positionIds', value)}
                        getLabel={(item) => item.positionName}
                        getValue={(item) => item.id}
                    />
                </Label>

                <Label label="기술 스택" direction="row">
                    <SelectBox
                        {...register('skillIds', { required: true })}
                        options={skills}
                        selectedValues={selectedSkills}
                        onChange={(value) => setValue('skillIds', value)}
                        placeholder="기술 선택"
                        maxSelected={5}
                        getLabel={(item) => item.skillName}
                        getValue={(item) => item.id}
                    />
                </Label>
            </div>

            <Textarea
                {...register('content', { required: true })}
                onChange={(e) => setValue('content', e.target.value)}
                size="lg"
                placeholder={`# 프로젝트 소개 예시
                - 어떤 프로젝트인가요?
                - 사용할 기술 스택은?
                - 대략적인 프로젝트 기간은 어떻게 되나요?
                자유롭게 작성해 주세요 :)`}
            />

            <div className={styles.btnBox}>
                <Button variant="cancel" size="md" onClick={() => router.back()}>
                    취소
                </Button>
                <Button variant="confirm" type="submit" size="md">
                    확인
                </Button>
            </div>
        </form>
    );
};

export default ProjectForm;
