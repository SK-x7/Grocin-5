/* eslint-disable react/prop-types */ 

import { createContext, useContext, useState } from "react";
import Modal from "../components/ui/Modal";

// Create the context
const ModalContext = createContext();

// Create a custom hook for easy access
function useModal() {
    const context= useContext(ModalContext);
    if(context===undefined){
        throw new Error("UiContext was used outside of the ui provider");
    }
    return context;
}

// Create a provider component
function ModalProvider({ children }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const openModal = (content) => {
        setModalContent(content);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setModalContent(null);
        setIsModalOpen(false);
    };

    return (
        <ModalContext.Provider value={{ isModalOpen,setIsModalOpen, openModal, closeModal, modalContent }}>
            {children}
            {isModalOpen && (
                <Modal onClose={closeModal}>
                    {modalContent}
                </Modal>
            )}
        </ModalContext.Provider>
    );
}


export {ModalProvider,useModal};