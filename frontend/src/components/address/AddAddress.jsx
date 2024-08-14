// import { useState } from "react"
// import { useModal } from "../../contexts/ModalContext";
import { useUiContext } from "../../contexts/UiContext";
// import { useUiContext } from "../../contexts/UiContext";
import Modal from "../ui/Modal";
import SelectAddressFromOptions from "./SelectAddressFromOptions"

function AddAddress() {
    const {isModalOpen,setIsModalOpen}=useUiContext();
    // setIsModalOpen(true);
    // console.log(isModalOpen,"🔴🔴🔴🔴🔴")
    // const [isModalOpen ,setIsModalOpen] =useState(true);
    
    
    
    // const {openModal,isModalOpen}=useModal();
    // const handleOpenModal = () => {
    //     openModal(<SelectAddressFromOptions />);
    // };
    
    // if(isModalOpen===true){
    //     handleOpenModal();
    // }
    
    // return(
    //     <div></div>
    //     // <div></div>
    // )
    return (
        <div className="">
            <span className="text-9xl">
                ljh
            </span>
            {
            isModalOpen&&    <Modal onClose={()=>setIsModalOpen(false)}><SelectAddressFromOptions oo={setIsModalOpen} onClose={()=>setIsModalOpen(false)}/></Modal>
            }
        </div>
    )
}

export default AddAddress
