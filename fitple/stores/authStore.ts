// 상태 관리 설정 (Zustand)

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
    // 상태 업데이트 메서드
    setId: (id: string) => void; // 사용자 ID 설정
    setNickname: (nickname: string) => void; // 사용자 이름 설정
    setEmail: (email: string) => void; // 사용자 이메일 설정
    setCareer: (career: number) => void; // 사용자 경력 설정
    setSkills: (skills: string[]) => void; // 사용자 포지션 설정
    setPosition: (position: string) => void; // 사용자 포지션 설정
    setToken: (token: string) => void; // 사용자 토큰 설정
    setAvatarUrl: (avatarUrl: string) => void; // 사용자 아바타 URL 설정
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
            token: null,
            avatarUrl: null,
            // 상태 업데이트 메서드
            setToken: (token) => set({ token }),
            setNickname: (nickname) => set({ nickname }),
            setEmail: (email) => set({ email }),
            setCareer: (career) => set({ career }),
            setId: (id) => set({ id }),
            setSkills: (skills) => set({ skills }),
            setPosition: (position) => set({ position }),
            setAvatarUrl: (avatarUrl) => set({ avatarUrl }),
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
