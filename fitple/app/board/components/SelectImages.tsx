'use client';

import { useRef, useState } from 'react';
import styles from './SelectImages.module.scss';
import Label from '@/components/Input/Label';

type ImageUploaderProps = {
    onChange?: (file: File | null) => void;
    label?: string;
};

const SelectImages = ({ onChange, label }: ImageUploaderProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            onChange?.(file);
        }
    };

    const handleClick = () => {
        inputRef.current?.click();
    };

    return (
        <div className={styles.layout}>
            <Label label={label}>
                <div className={styles.preview} onClick={handleClick}>
                    {preview ? (
                        <img src={preview} alt="미리보기" />
                    ) : (
                        <div className={styles.placeholder}>+ 이미지 선택</div>
                    )}
                </div>
            </Label>

            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleFileChange}
                className={styles.hiddenInput}
            />
        </div>
    );
};

export default SelectImages;
