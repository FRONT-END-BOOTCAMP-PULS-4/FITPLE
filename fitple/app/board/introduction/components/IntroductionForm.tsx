'use client';

import styles from './IntroductionForm.module.scss';
import { useForm } from 'react-hook-form';
import { RecruitmentStatus, WorkMode } from '@/type/common';
import Label from '@/components/Input/Label';
import SelectBox from '@/components/Select/SelectBox';
import { SKILLS, SkillOption, POSITIONS, PositionOption, SkillValue, PositionValue } from '@/constants';
import Textarea from '@/components/Textarea/Textarea';
import SelectImages from '../../components/SelectImages';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import SelectWorkMode from '../../components/SelectWorkMode';
import SelectStatus from '../../components/SelectStatus';

export type IntroductionFormData = {
    title: string;
    content: string;
    positions: PositionValue[];
    skills: SkillValue[];
    workMode: WorkMode;
    status: RecruitmentStatus;
    imgFile: File | null;
};

/** 여기서 수정이라면, 기존 데이터 가져와서 보여주기 */

const IntroductionForm = () => {
    const { register, handleSubmit, setValue, watch } = useForm<IntroductionFormData>({
        mode: 'onSubmit',
    });
    const selectedPositions = watch('positions') || [];
    const selectedSkills = watch('skills') || [];

    const onSubmit = (data: IntroductionFormData) => {
        console.log('폼 제출 값:', data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.layout}>
            <Input variant="underline" placeholder="제목을 입력해주세요" {...register('title', { required: true })} />

            <div className={styles.selectBox}>
                <SelectWorkMode register={register} setValue={setValue} />
                <SelectStatus register={register} setValue={setValue} />

                <Label label="포지션" direction="row">
                    <SelectBox
                        {...register('positions', { required: true })}
                        options={POSITIONS as unknown as PositionOption[]}
                        selectedValues={selectedPositions}
                        onChange={(value) => setValue('positions', value)}
                        placeholder="포지션 선택"
                    />
                </Label>

                <Label label="기술 스택" direction="row">
                    <SelectBox
                        {...register('skills', { required: true })}
                        options={SKILLS as unknown as SkillOption[]}
                        selectedValues={selectedSkills}
                        onChange={(value) => setValue('skills', value)}
                        placeholder="기술 선택"
                        maxSelected={5}
                    />
                </Label>
            </div>

            <Textarea
                {...register('content', { required: true })}
                onChange={(e) => setValue('content', e.target.value)}
                size="md"
                placeholder={`# 자기소개 예시
                - 본인을 자유롭게 소개해주세요
                - 사용 가능한 기술 스택은?
                - 관심 있는 분야나 프로젝트는?
                자유롭게 작성해 주세요 :)`}
            />

            <SelectImages label="사진을 넣어주세요" onChange={(file) => setValue('imgFile', file)} />

            <div className={styles.btnBox}>
                <Button variant="cancel" size="md">
                    취소
                </Button>
                <Button variant="confirm" type="submit" size="md">
                    확인
                </Button>
            </div>
        </form>
    );
};

export default IntroductionForm;
