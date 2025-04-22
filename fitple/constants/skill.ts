export const SKILLS = [
    { value: 'react', label: 'React' },
    { value: 'next', label: 'Next.js' },
    { value: 'node', label: 'Node.js' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'svelt', label: 'Svelt' },
    { value: 'java', label: 'Java' },
    { value: 'go', label: 'Go' },
    { value: 'python', label: 'Python' },
    { value: 'firebase', label: 'Firebase' },
    { value: 'kotlin', label: 'Kotlin' },
    { value: 'django', label: 'DJango' },
    { value: 'express', label: 'Express' },
    { value: 'flutter', label: 'Flutter' },
    { value: 'graphql', label: 'GraphQL' },
    { value: 'mongodb', label: 'MongoDB' },
    { value: 'mysql', label: 'MySQL' },
    { value: 'nest', label: 'Nest' },
    { value: 'php', label: 'php' },
    { value: 'spring', label: 'Spring' },
    { value: 'swift', label: 'Swift' },
    { value: 'unity', label: 'Unity' },
] as const;

export type SkillOption = (typeof SKILLS)[number];
export type SkillValue = SkillOption['value'];
export type SkillLabel = SkillOption['label'];
