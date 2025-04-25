// 상태 관리 설정 (Zustand)
const skillMap: { [key: string]: string } = {
    '1': 'react',
    '2': 'javascript',
    '3': 'next',
    '4': 'django',
    '5': 'express',
    '6': 'firebase',
    '7': 'flutter',
    '8': 'go',
    '9': 'graphql',
    '10': 'kotlin',
    '11': 'mongodb',
    '12': 'mysql',
    '13': 'nest',
    '14': 'node',
    '15': 'php',
    '16': 'python',
    '17': 'spring',
    '18': 'swift',
    '19': 'typescript',
    '20': 'unity',
    '21': 'vue',
    react: 'react',
    javascript: 'javascript',
    next: 'next',
    django: 'django',
    express: 'express',
    firebase: 'firebase',
    flutter: 'flutter',
    go: 'go',
    graphql: 'graphql',
    kotlin: 'kotlin',
    mongodb: 'mongodb',
    mysql: 'mysql',
    nest: 'nest',
    node: 'node',
    php: 'php',
    python: 'python',
    spring: 'spring',
    swift: 'swift',
    typescript: 'typescript',
    unity: 'unity',
    vue: 'vue',
};
const positionMap: { [key: string]: string } = {
    '1': 'FE',
    '2': 'BE',
    '3': 'PM',
    '4': 'FS',
    '5': 'DI',
    프론트엔드: 'FE',
    백엔드: 'BE',
    PM: 'PM',
    풀스택: 'FS',
    디자이너: 'DI',
};
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthState = {
    id: string | null; // 사용자 ID
    nickname: string | null; // 사용자 이름
    email: string | null; // 사용자 이메일
    career: number | null; // 사용자 경력
    skills: string[]; // 사용자 기술스택
    position: string; // 사용자 포지션
    token: string | null; // 사용자 토큰
    avatarUrl: string | null; // 사용자 아바타 URL
    signUpPayload: {
        id: string | null; // 사용자 ID
        name: string | null; // 사용자 이름
        nickname: string | null; // 사용자 이름
        email: string | null; // 사용자 이메일
        career: number | null; // 사용자 경력
        skills: string[]; // 사용자 기술스택
        position: string | null; // 사용자 포지션
        avatarUrl: string | null; // 사용자 아바타 URL
        socialClientId: string | null; // 사용자 소셜 클라이언트 ID
    };
    // 상태 업데이트 메서드
    setId: (id: string) => void; // 사용자 ID 설정
    setNickname: (nickname: string) => void; // 사용자 이름 설정
    setEmail: (email: string) => void; // 사용자 이메일 설정
    setCareer: (career: number) => void; // 사용자 경력 설정
    setSkills: (skills: string[]) => void; // 사용자 포지션 설정
    setPosition: (position: string) => void; // 사용자 포지션 설정
    setToken: (token: string) => void; // 사용자 토큰 설정
    setAvatarUrl: (avatarUrl: string) => void; // 사용자 아바타 URL 설정
    setSignUpPayload: (payload: {
        id: string | null; // 사용자 ID
        name: string | null; // 사용자 이름
        nickname: string | null; // 사용자 이름
        email: string | null; // 사용자 이메일
        career: number | null; // 사용자 경력
        skills: string[]; // 사용자 기술스택
        position: string | null; // 사용자 포지션
        avatarUrl: string | null; // 사용자 아바타 URL
        socialClientId: string | null; // 사용자 소셜 클라이언트 ID
    }) => void; // 회원가입 정보 설정
    // 상태 초기화 메서드
    clearAuth: () => void; // 사용자 정보 초기화
    // 인증 여부 확인 메서드
    isAuthenticated: () => boolean; // 인증 여부 확인
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            id: null,
            nickname: null,
            email: null,
            career: null,
            skills: [],
            position: '',
            signUpPayload: {
                id: null,
                name: null,
                nickname: null,
                email: null,
                career: null,
                skills: [],
                position: null,
                avatarUrl: null,
                socialClientId: null,
            },
            token: null,
            avatarUrl: null,
            // 상태 업데이트 메서드
            setToken: (token) => set({ token }),
            setNickname: (nickname) => set({ nickname }),
            setEmail: (email) => set({ email }),
            setCareer: (career) => set({ career }),
            setId: (id) => set({ id }),
            setSkills: (skills: string[]) =>
                set({
                    skills: skills.map((skillId: string) => skillMap[skillId] || `unknown(${skillId})`),
                }),
            setPosition: (position: string) =>
                set({
                    position: positionMap[position] || `unknown(${position})`,
                }),
            setAvatarUrl: (avatarUrl) => set({ avatarUrl }),
            setSignUpPayload: (payload) =>
                set({
                    signUpPayload: {
                        id: payload.id,
                        name: payload.name,
                        nickname: payload.nickname,
                        email: payload.email,
                        career: payload.career,
                        skills: payload.skills,
                        position: payload.position,
                        avatarUrl: payload.avatarUrl,
                        socialClientId: payload.socialClientId,
                    },
                }),
            // 상태 초기화 메서드
            clearAuth: () =>
                set({
                    id: null,
                    nickname: null,
                    skills: [],
                    token: null,
                }),
            // 인증 여부 확인 메서드
            isAuthenticated: () => !!get().token, // 토큰이 존재하면 인증된 상태
        }),
        { name: 'auth-storage' } // LocalStorage 키 이름
    )
);
