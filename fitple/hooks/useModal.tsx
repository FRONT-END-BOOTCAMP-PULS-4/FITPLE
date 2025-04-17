import { useState } from "react";

type ModalHookProps = {
    initialState?: boolean;
};

export const useModal = ({ initialState = false }: ModalHookProps) => {
    const [isOpen, setIsOpen] = useState(initialState);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return { isOpen, openModal, closeModal };
};
