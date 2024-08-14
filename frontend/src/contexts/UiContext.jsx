/* eslint-disable react/prop-types */

import { createContext, useContext, useState } from "react"

const UiContext=createContext();

function UiProvider({children}) {
    const [isModalOpen ,setIsModalOpen] =useState(false);
    function closeModal() {
        setIsModalOpen(false);
    }
    const value={isModalOpen,setIsModalOpen,closeModal};
    return <UiContext.Provider value={value}>{children}</UiContext.Provider>
}

function useUiContext() {
    const context = useContext(UiContext);
    if(context===undefined){
        throw new Error("UiContext was used outside of the ui provider");
    }
    return context;
}


export {UiProvider,useUiContext}
