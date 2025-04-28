// import RegularModal from "./components/ui/RegularModal";
// import { useUiContext } from "./contexts/UiContext";

// function TestModals() {
//     const {setIsModalOpen,isModalOpen}=useUiContext();
//     const {addressLabel,handleAddressLabelChange}=useUiContext();
//     const {handleSubmitAddress}=useUiContext();
//     setIsModalOpen(true);
    

    
    
//     return (
//         <div className="">
            
//                         { 
//             isModalOpen&&<RegularModal onClose={()=>setIsModalOpen(false)}>
//                 <main className="bg-white flex flex-col justify-start items-center w-[25vw]">
//                 <div className=" w-full">
                        
//                     <h1 className="text-lg font-semibold">Add address label</h1>
//                     <div className="mt-[6px] flex flex-col justify-center items-start gap-3 mb-5">
//                     <h2>Ex : Home, Work, Other</h2>
//                     <input type="text" className="w-full rounded-lg" value={addressLabel} onChange={handleAddressLabelChange}/>
//                     </div>
//                     <div className="flex self-end !justify-self-end justify-end flex-wrap gap-3" >
//                         <button className="bg-gray-200 py-[6px] px-[14px] ring-1 ring-gray-700 rounded-xl">Cancel</button>
//                         <button className="bg-blue-600 text-white py-[6px] px-[14px] ring-1 rounded-xl flex justify-center !items-center" onClick={handleSubmitAddress}>Save</button>
//                     </div>
//                 </div>
//                 </main>
//             </RegularModal>
//             }
//         </div>
//     )
// }

// export default TestModals


//first popUp⬆️⤴️🔝
//second popUp⬇️⤵️⏬🔽

// function testModals() {
//     return (
//         <div>
            
//         </div>
//     )
// }

// export default testModals

//third popUp⬇️⤵️⏬🔽



import RegularModal from "./components/ui/RegularModal";
import { useUiContext } from "./contexts/UiContext";

function TestModals() {
    const {isRegularModalOpen,setIsRegularModalOpen,closeModal}=useUiContext();
    const {editAddressLabelValue,editAddressValue}=useUiContext();
    const {handleEditAddressLabelValueChange,handleEditAddressValueChange}=useUiContext();
    const {handleSubmitAddress}=useUiContext();
    setIsRegularModalOpen(true)

    
    
    return (
        <div className="">
            
                        { 
            isRegularModalOpen&&<RegularModal onClose={()=>setIsRegularModalOpen(false)}>
                <main className="bg-white flex flex-col justify-start items-center w-[25vw] px-4 gap-16">
                <div className=" w-full">
                        
                    <h1 className="text-lg font-semibold capitalize">Edit saved address</h1>
                    <div className="mt-[16px] flex flex-col justify-center items-start gap-3 mb-5">
                    <h2 className="capitalize font-medium">label :</h2>
                    <input type="text" className="w-full rounded-lg" value={editAddressLabelValue} onChange={handleEditAddressLabelValueChange}/>
                    <h2 className="capitalize font-medium">address :</h2>
                    <input type="text" className="w-full rounded-lg" value={editAddressValue} onChange={handleEditAddressValueChange}/>
                    </div>
                    <div className="flex self-end !justify-self-end justify-end flex-wrap gap-3  mt-7" >
                        <button className="bg-gray-200 py-[6px] px-[14px] ring-1 ring-gray-700 rounded-xl" onClick={(e)=>{
                            e.preventDefault();
                            closeModal();
                        }}>Cancel</button>
                        <button className="bg-blue-600 text-white py-[6px] px-[14px] ring-1 rounded-xl flex justify-center !items-center" onClick={handleSubmitAddress}>Save</button>
                    </div>
                </div>
                </main>
            </RegularModal>
            }
        </div>
    )
}

export default TestModals
