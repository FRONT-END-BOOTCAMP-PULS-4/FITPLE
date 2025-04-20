"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { ApplyStatus } from "@/type/common";

export default function Home() {
    const [status, setStatus] = useState<ApplyStatus>("waiting");

    useEffect(() => {
        const fetchApply = async () => {
            const data = await fetch("/api/member/apply?id=1", {
                method: "GET",
            });

            const response = await data.json();

            console.log(response);
            if (response.status) {
                setStatus(response.status); // 초기 상태 설정
            }
        };

        fetchApply();
    }, []);
    // useEffect(() => {
    //     const fetchApply = async () => {
    //         const data = await fetch("/api/member/apply", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({
    //                 userId: 'fbb321b6-2dab-4aa9-8c02-290e6c7fb0b3', //존재하는 user ID로 해야됨
    //                 projectId: 1,
    //                 message: "테스트",
    //                 status: 'waiting',
    //             }),
    //         });

    //         // 응답 데이터 추출
    //         const response = await data.json();  // JSON 파싱 후 데이터 사용
    //         console.log(response);  // 이 부분을 콘솔에 출력하여 제대로 된 데이터를 확인
    //         return response;
    //     };

    //     fetchApply();
    // }, []);
    const updateStatus = async (newStatus: ApplyStatus) => {
        try {
            const response = await fetch(`/api/member/apply?id=1`, {
                method: "PUT",
                body: JSON.stringify({
                    applyId: 1,
                    status: newStatus,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const result = await response.json();
            if (response.ok) {
                setStatus(newStatus); // 상태 업데이트
            } else {
                console.error("Failed to update status:", result.error);
            }
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const handleAccept = () => {
        updateStatus("accept"); // 수락 버튼 클릭 시
    };

    const handleReject = () => {
        updateStatus("reject"); // 거절 버튼 클릭 시
    };
    return (
        <div>
            <div className={styles.base}>기본! 123</div>
            <div className={styles.toss}>토스! 123</div>

            {/* 상태에 맞게 버튼 텍스트를 변경 */}
            <div style={{ color: "white" }}>
                <p>현재 상태: {status}</p>
                <>
                    <button style={{ backgroundColor: "white" }} onClick={handleAccept}>
                        수락하기
                    </button>
                    <button style={{ backgroundColor: "white" }} onClick={handleReject}>
                        거절하기
                    </button>
                </>
                {status === "accept"}
                {status === "reject"}
            </div>
        </div>
    );
}
