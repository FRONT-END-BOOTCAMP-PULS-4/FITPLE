export const POSITIONS = [
    { value: 'FE', label: '프론트엔드' },
    { value: 'BE', label: '백엔드' },
    { value: 'DI', label: '디자이너' },
    { value: 'FS', label: '풀스택' },
    { value: 'PM', label: '프로젝트 매니저' },
] as const;

export type PositionOption = (typeof POSITIONS)[number];
export type PositionValue = PositionOption['value'];
export type PositionLabel = PositionOption['label'];
