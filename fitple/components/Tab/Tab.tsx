'use client';

import { useEffect, useState } from 'react';
import styles from './Tab.module.scss';
import { IntroductionTab } from './IntroductionTab';
import { ProjectTab } from './ProjectTab';

import SkillSelectBox from '../SkillSelectBox/SkillSelectBox';
import PositionSelectBox from '../PositionSelectBox/PositionSelectBox';
import { SkillDto } from '@/back/skill/application/usecases/dto/SkillDto';
import { PositionDto } from '@/back/position/application/usecases/dto/PositionDto';

export function Tab() {
    const [skillOptions, setSkillOptions] = useState<string[]>([]);
    const [positionOptions, setPositionOptions] = useState<string[]>([]);

    useEffect(() => {
        const fetchSkills = async () => {
            const res = await fetch('/api/skills');
            const skills: SkillDto[] = await res.json(); // skills의 타입을 명시적으로 SkillDto[]로 지정
            setSkillOptions(skills.map((s) => s.skillName)); // 이제 s는 SkillDto 타입이기 때문에 skill_name 접근 가능
        };
        fetchSkills();
    }, []);
    useEffect(() => {
        const fetchPositions = async () => {
            const res = await fetch('/api/positions');
            const positions: PositionDto[] = await res.json(); // skills의 타입을 명시적으로 SkillDto[]로 지정
            setPositionOptions(positions.map((p) => p.positionName)); // 이제 s는 SkillDto 타입이기 때문에 skill_name 접근 가능
        };
        fetchPositions();
    }, []);

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
                <SkillSelectBox options={skillOptions} handler={setSelectedSkills} />
            </div>
            <div className={styles.positionSelectBox}>
                <PositionSelectBox options={positionOptions} handler={setSelectedPositions} />
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
