"use client";

import { useState } from "react";
import styles from "./Tab.module.scss";
import SelectBox from "../SelectBox/page";
import { IntroductionTab } from "./IntroductionTab";
import { ProjectTab } from "./ProjectTab";

export function Tab() {
    const [tab, setTab] = useState<"introduction" | "project">("introduction");
    const options = ["React", "JavaScript", "django", "mongodb", "spring", "node", "mysql", "python"];
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    return (
        <div className={styles.tabsMain}>
            <div className={styles.tabList}>
                <button
                    className={`${styles.tab} ${tab === "introduction" ? styles.active : ""}`}
                    onClick={() => setTab("introduction")}
                >
                    데려가요
                </button>
                <span style={{ color: "white", userSelect: "none" }}>|</span>
                <button
                    className={`${styles.tab} ${tab === "project" ? styles.active : ""}`}
                    onClick={() => setTab("project")}
                >
                    어서와요
                </button>
            </div>
            <div>
                <SelectBox options={options} handler={setSelectedOptions} />
                <h4 style={{ color: "white" }}>{selectedOptions}</h4>
            </div>
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
