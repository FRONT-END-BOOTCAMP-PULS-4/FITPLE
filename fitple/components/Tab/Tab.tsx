"use client";

import { useState } from "react";
import styles from "./Tab.module.scss";
import { IntroductionTab } from "./IntroductionTab";
import { ProjectTab } from "./ProjectTab";

import SkillSelectBox from "../SkillSelectBox/SkillSelectBox";

export function Tab() {
    const [tab, setTab] = useState<"introduction" | "project">("introduction");
    const options = ["React", "JavaScript", "django", "mongodb", "spring", "node", "mysql", "python"];
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    // const [selected, setSelected] = useState<PositionValue[]>([]);
    return (
        <div className={styles.tabsMain}>
            <div className={styles.tabList}>
                <button
                    className={`${styles.tab} ${tab === "introduction" ? styles.active : ""}`}
                    onClick={() => setTab("introduction")}
                >
                    데려가요
                </button>
                <span className={styles.line}>|</span>
                <button
                    className={`${styles.tab} ${tab === "project" ? styles.active : ""}`}
                    onClick={() => setTab("project")}
                >
                    어서와요
                </button>
            </div>
            <div className={styles.skillSelectBox}>
                <SkillSelectBox options={options} handler={setSelectedOptions} />
            </div>
            {/* <div className={styles.selectBox}>
                <SelectBox
                    options={POSITIONS as unknown as PositionOption[]}
                    selectedValues={selected}
                    onChange={setSelected}
                    placeholder="포지션 선택"
                />
            </div> */}
            <div className={`${styles.tabContent} ${styles.start} ${styles.end}`}>
                {tab === "introduction" && (
                    <div>
                        <IntroductionTab selectedOptions={selectedOptions} />
                    </div>
                )}
                {tab === "project" && (
                    <div>
                        <ProjectTab selectedOptions={selectedOptions} />
                    </div>
                )}
            </div>
            <div style={{ color: "white", marginLeft: "550px" }}>페이지네이션 들어갈 자리</div>
        </div>
    );
}
