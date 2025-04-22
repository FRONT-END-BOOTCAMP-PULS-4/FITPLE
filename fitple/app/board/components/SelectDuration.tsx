'use client';

import Label from '@/components/Input/Label';
import Select from '@/components/Select/Select';
import Option from '@/components/Select/Option';
import { FieldValues } from 'react-hook-form';

export const durationOptions: { value: number; label: string }[] = [
    { value: 1, label: '1개월' },
    { value: 2, label: '2개월' },
    { value: 3, label: '3개월' },
    { value: 4, label: '4개월' },
    { value: 5, label: '5개월' },
    { value: 6, label: '6개월 이상' },
];

const SelectDuration = <T extends FieldValues>({ register, setValue }: T) => {
    return (
        <Label label="예상 기간" direction="row">
            <Select
                {...register('duration', { required: true })}
                onChange={(value) => setValue('duration', value)}
                options={durationOptions}
                placeholder="선택"
            >
                {durationOptions.map((duration) => (
                    <Option key={duration.value} value={duration.value}>
                        {duration.label}
                    </Option>
                ))}
            </Select>
        </Label>
    );
};

export default SelectDuration;
