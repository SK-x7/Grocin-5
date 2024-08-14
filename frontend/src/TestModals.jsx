import RegularModal from "./components/ui/RegularModal";
import { useUiContext } from "./contexts/UiContext";

function TestModals() {
    const {setIsModalOpen,isModalOpen}=useUiContext();
    setIsModalOpen(true);
    return (
        <div className="">
            
                        { 
            isModalOpen&&<RegularModal onClose={()=>setIsModalOpen(false)}>
                <main className="bg-white flex flex-col justify-start items-center w-[25vw]">
                <div className=" w-full">
                        
                    <h1 className="text-lg font-semibold">Add address label</h1>
                    <div className="mt-[6px] flex flex-col justify-center items-start gap-3 mb-5">
                    <h2>Ex : Home, Work, Other</h2>
                    <input type="text" className="w-full rounded-lg"/>
                    </div>
                    <div className="flex self-end !justify-self-end justify-end flex-wrap gap-3" >
                        <button className="bg-gray-200 py-[6px] px-[14px] ring-1 ring-gray-700 rounded-xl">Cancel</button>
                        <button className="bg-blue-600 text-white py-[6px] px-[14px] ring-1 rounded-xl flex justify-center !items-center">Confirm</button>
                    </div>
                </div>
                </main>
            </RegularModal>
            }
        </div>
    )
}

export default TestModals
