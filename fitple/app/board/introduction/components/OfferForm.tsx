"use client";

import styles from "./OfferForm.module.scss";
import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";
import Textarea from "@/components/Textarea/Textarea";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getMyProjectList } from "../service/getMyProjectList";
import { useAuthStore } from "@/stores/authStore";
import { Project } from "@/back/project/domain/entities/Project";
import { offerFormService } from "../service/offerFormService";

type Props = {
    closeModal: () => void;
    isOpen: boolean;
    introductionId: number;
};

type ApplyFormData = {
    content: string;
    projectId: number;
};

export type OfferFormData = {
    projectId: number;
    introductionId: number;
    message: string;
    status: string;
};

const OfferForm = ({ closeModal, isOpen, introductionId }: Props) => {
    const { register, handleSubmit, watch } = useForm<ApplyFormData>();
    const { token } = useAuthStore();
    const [myProjects, setMyProjects] = useState<Project[]>();
    const [isExist, setIsExist] = useState(false);
    const selectedProjectId = watch("projectId");
    useEffect(() => {
        const fetchMyProjects = async () => {
            if (token) {
                const data = await getMyProjectList(token);
                setMyProjects(data);
            }
        };

        fetchMyProjects();
    }, [token]);

    useEffect(() => {
        const checkDuplicatedOffer = async () => {
            if (selectedProjectId) {
                const data = await fetch(
                    `/api/member/offer/check?projectId=${selectedProjectId}&introductionId=${introductionId}`
                );

                const res = await data.json();
                setIsExist(res);
            }
        };
        checkDuplicatedOffer();
    }, [selectedProjectId, introductionId]);

    const onSubmit = async (data: ApplyFormData) => {
        const params = {
            projectId: data.projectId,
            message: data.content,
            introductionId: introductionId,
            status: "waiting",
        };
        await offerFormService(token!, params);

        closeModal();
    };

    return (
        <>
            {isOpen && (
                <Modal
                    header={<div className={styles.modalHeader}>제안서 작성</div>}
                    body={
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={styles.container}>
                                <Textarea
                                    {...register("content", { required: true })}
                                    size="md"
                                    placeholder={`예시)
- 같이 프로젝트를 하자고 제안해보세요.
- 어떤 프로젝트를 구상하고 있는지,
- 기간, 기술스택, 자유롭게 작성해보세요 :)`}
                                />
                            </div>
                            <select
                                {...register("projectId", { required: true })}
                                className={styles.select}
                                defaultValue=""
                            >
                                <option value="" disabled hidden>
                                    함께 할 프로젝트를 골라주세요
                                </option>
                                {myProjects?.map((project) => (
                                    <option key={project.id} value={project.id} className={styles.option}>
                                        {project.title}
                                    </option>
                                ))}
                            </select>

                            <div className={styles.btnBox}>
                                <Button variant="cancel" size="md" onClick={closeModal}>
                                    취소하기
                                </Button>
                                <Button variant="confirm" size="md" style={{ color: "black" }} disabled={isExist}>
                                    제안하기
                                </Button>
                            </div>
                        </form>
                    }
                    onClose={closeModal}
                />
            )}
        </>
    );
};

export default OfferForm;
