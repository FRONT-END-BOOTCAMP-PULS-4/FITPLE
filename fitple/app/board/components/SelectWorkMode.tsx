'use client';

import styles from './SelectLayout.module.scss';
import Label from '@/components/Input/Label';
import Select from '@/components/Select/Select';
import Option from '@/components/Select/Option';
import { WorkMode } from '@/type/common';
import { FieldValues } from 'react-hook-form';

export const workModeOptions: { value: WorkMode; label: string }[] = [
    { value: 'online', label: '온라인' },
    { value: 'offline', label: '오프라인' },
];

const SelectWorkMode = <T extends FieldValues>({ register, setValue }: T) => {
    return (
        <div className={styles.layout}>
            <Label label="작업방식" direction="row">
                <Select
                    {...register('workMode', { required: true })}
                    onChange={(value) => setValue('workMode', value)}
                    options={workModeOptions}
                    placeholder="선택"
                >
                    {workModeOptions.map((work) => (
                        <Option key={work.value} value={work.value}>
                            {work.label}
                        </Option>
                    ))}
                </Select>
            </Label>
        </div>
    );
};

export default SelectWorkMode;
