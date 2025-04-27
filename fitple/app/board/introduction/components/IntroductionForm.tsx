'use client';

import styles from './IntroductionForm.module.scss';
import { useForm } from 'react-hook-form';
import { RecruitmentStatus, WorkMode } from '@/type/common';
import Label from '@/components/Input/Label';
import SelectBox from '@/components/Select/SelectBox';
import Textarea from '@/components/Textarea/Textarea';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import SelectWorkMode from '../../components/SelectWorkMode';
import SelectStatus from '../../components/SelectStatus';
import { useStaticDataStore } from '@/stores/useStaticStore';
import { useRouter } from 'next/navigation';
import { postIntroduction } from '../service/postIntroduction';
import { useAuthStore } from '@/stores/authStore';

export type IntroductionFormData = {
    title: string;
    content: string;
    positionIds: number[];
    skillIds: number[];
    workMode: WorkMode;
    status: RecruitmentStatus;
    imgFile?: File | null;
};

/** 여기서 수정이라면, 기존 데이터 가져와서 보여주기 */

const IntroductionForm = () => {
    const router = useRouter();
    const { token } = useAuthStore();
    const { skills, positions } = useStaticDataStore();
    const { register, handleSubmit, setValue, watch } = useForm<IntroductionFormData>({
        mode: 'onSubmit',
    });
    const selectedPositions = watch('positionIds') || [];
    const selectedSkills = watch('skillIds') || [];

    const onSubmit = async (data: IntroductionFormData) => {
        const params = {
            title: data.title,
            content: data.content,
            positionIds: data.positionIds,
            skillIds: data.skillIds,
            status: data.status,
            workMode: data.workMode,
        };

        try {
            const result = await postIntroduction(token!, params);

            if (result) router.push('/');
        } catch (error) {
            console.error(error);
            /** 나중에 모달이나 토스트 알람 띄우기 */
            alert('게시글 작성에 실패했습니다. 잠시 후 다시 시도해주세요.');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.layout}>
            <Input inputClassName={styles.customInput} variant="underline" placeholder="제목을 입력해주세요" {...register('title', { required: true })}/>

            <div className={styles.selectBox}>
                <SelectWorkMode register={register} setValue={setValue} />
                <SelectStatus register={register} setValue={setValue} />

                <Label label="포지션" direction="row">
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
                        maxSelected={5}
                        getLabel={(item) => item.skillName}
                        getValue={(item) => item.id}
                    />
                </Label>
            </div>

            <Textarea
                size="lg"
                {...register('content', { required: true })}
                onChange={(e) => setValue('content', e.target.value)}
                placeholder={`# 자기소개 예시
                - 본인을 자유롭게 소개해주세요
                - 사용 가능한 기술 스택은?
                - 관심 있는 분야나 프로젝트는?
                자유롭게 작성해 주세요 :)`}
            />

            <div className={styles.btnBox}>
                <Button variant="cancel" size="md" onClick={() => router.back()}>
                    취소
                </Button>
                <Button variant="confirm" type="submit" size="md" style={{ color: 'black'}}>
                    확인
                </Button>
            </div>
        </form>
    );
};

export default IntroductionForm;
