'use client';

import { useEffect, useState } from 'react';
import styles from './Tab.module.scss';
import { IntroductionTab } from './IntroductionTab';
import { ProjectTab } from './ProjectTab';
import SkillSelectBox from '../SkillSelectBox/SkillSelectBox';
import PositionSelectBox from '../PositionSelectBox/PositionSelectBox';
import { SkillDto } from '@/back/skill/application/usecases/dto/SkillDto';
import { PositionDto } from '@/back/position/application/usecases/dto/PositionDto';
import { useStaticDataStore } from '@/stores/useStaticStore';

export function Tab() {
    const { setPositions, setSkills, skills, positions } = useStaticDataStore();

    useEffect(() => {
        const fetchSkills = async () => {
            const res = await fetch('/api/skills');
            const skills: SkillDto[] = await res.json(); // skills의 타입을 명시적으로 SkillDto[]로 지정
            setSkills(skills);
        };
        fetchSkills();
    }, [setSkills]);

    useEffect(() => {
        const fetchPositions = async () => {
            const res = await fetch('/api/positions');
            const positions: PositionDto[] = await res.json(); // skills의 타입을 명시적으로 SkillDto[]로 지정
            setPositions(positions);
        };
        fetchPositions();
    }, [setPositions]);

    const skillNames = skills.map((skill) => skill.skillName);
    const positionNames = positions.map((position) => position.positionName);

    const [tab, setTab] = useState<'introduction' | 'project'>('introduction');

    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [selectedPositions, setSelectedPositions] = useState<string[]>([]);

    return (
        <div className={styles.tabsMain}>
            <div className={styles.tabList}>
                <button
                    className={`${styles.tab} ${tab === 'introduction' ? styles.active : ''}`}
                    onClick={() => setTab('introduction')}
                >
                    데려가요
                </button>
                <span className={styles.line}>|</span>
                <button
                    className={`${styles.tab} ${tab === 'project' ? styles.active : ''}`}
                    onClick={() => setTab('project')}
                >
                    어서와요
                </button>
            </div>
            <div className={styles.skillSelectBox}>
                <SkillSelectBox options={skillNames} handler={setSelectedSkills} />
            </div>
            <div className={styles.positionSelectBox}>
                <PositionSelectBox options={positionNames} handler={setSelectedPositions} />
            </div>
            <div className={`${styles.tabContent}`}>
                {tab === 'introduction' && (
                    <div>
                        <IntroductionTab selectedSkills={selectedSkills} selectedPositions={selectedPositions} />
                    </div>
                )}
                {tab === 'project' && (
                    <div>
                        <ProjectTab selectedSkills={selectedSkills} selectedPositions={selectedPositions} />
                    </div>
                )}
            </div>
        </div>
    );
}
