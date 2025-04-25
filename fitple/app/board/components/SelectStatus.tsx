'use client';

import styles from './SelectLayout.module.scss';
import Label from '@/components/Input/Label';
import Select from '@/components/Select/Select';
import Option from '@/components/Select/Option';
import { FieldValues } from 'react-hook-form';
import { RecruitmentStatus } from '@/type/common';

export const statusOptions: { value: RecruitmentStatus; label: string }[] = [
    { value: 'open', label: '열려있음' },
    { value: 'closed', label: '닫혀있음' },
];

const SelectStatus = <T extends FieldValues>({ register, setValue }: T) => {
    return (
        <div className={styles.layout}>
            <Label label="상태" direction="row">
                <Select
                    {...register('status', { required: true })}
                    onChange={(value) => setValue('status', value)}
                    options={statusOptions}
                    placeholder="선택"
                >
                    {statusOptions.map((status) => (
                        <Option value={status.value} key={status.value}>
                            {status.label}
                        </Option>
                    ))}
                </Select>
            </Label>
        </div>
    );
};

export default SelectStatus;
