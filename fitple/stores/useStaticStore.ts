import { Position } from '@/back/position/domain/entities/Position';
import { Skill } from '@/back/skill/domain/entities/Skill';
import { create } from 'zustand';

type StaticDataStore = {
    skills: Skill[];
    positions: Position[];
    setSkills: (skills: Skill[]) => void;
    setPositions: (positions: Position[]) => void;
};

export const useStaticDataStore = create<StaticDataStore>((set) => ({
    skills: [],
    positions: [],
    setSkills: (skills) => set({ skills }),
    setPositions: (positions) => set({ positions }),
}));
