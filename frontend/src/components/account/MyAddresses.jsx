import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserSavedAddresses } from "../../apis/userApi";
import { useUiContext } from "../../contexts/UiContext";
import { setIsSideCartOpen } from "../../features/cartSlice";
import { useUser } from "../../hooks/useUser";
import EditSavedAddressPopup from "../ModalAndPopups/Modal_Popups/EditSavedAddressPopup";
import RegularModal from "../ui/RegularModal";

function MyAddresses() {
    const {setIsRegularModalOpen,isRegularModalOpen}=useUiContext();
    const {setEditAddressLabelValue,setEditAddressValue,setEditAddressId,handleSubmitdeleteAddress}=useUiContext();
    const navigate=useNavigate();
    const dispatch = useDispatch();
    const isSideCartOpen=useSelector((state)=>state.cart.isSideCartOpen);
    const {currentUserId}= useUser();
    
    const {data,isLoading}= useQuery(
        ["getUserSavedAddresses", currentUserId],
        () => getUserSavedAddresses(currentUserId),
        {
            enabled:!!currentUserId
        }
    )
    
    
    
    const savedAddressesByUser=data?.addresses;
    console.log(savedAddressesByUser);
    if(isLoading)   return <div>..............</div>
    if(!savedAddressesByUser?.length) return <div>⚠️ You did not saved any address yet</div>

    

    
    return (
        <main className="w-full divide-y-2">
                            {isRegularModalOpen&& <RegularModal onClose={()=>setIsRegularModalOpen(false)}>
     <EditSavedAddressPopup/>
  </RegularModal>}
        <div className="flex justify-between items-center px-12 pb-6">
            <h3 className="font-semibold">All Saved Addresses</h3>
            <button className="text-sm py-3 px-7 border rounded-lg bg-blue-600 text-white  tracking-wider" onClick={(e)=>{
                e.preventDefault();
                if(isSideCartOpen===true){
                    dispatch(setIsSideCartOpen())
                }
                navigate("/map");
            }}>Add New Address</button>
        </div>
        <ul className="w-full flex  flex-col justify-center items-center">
            {
                savedAddressesByUser?.map((adr,i)=>(
                    <li className="!w-4/5 pt-4 flex justify-start items-center gap-2" key={i}>
                    <div className="flex justify-center items-center h-full !justify-self-start ">
    
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 3c2.131 0 4 1.73 4 3.702 0 2.05-1.714 4.941-4 8.561-2.286-3.62-4-6.511-4-8.561 0-1.972 1.869-3.702 4-3.702zm0-2c-3.148 0-6 2.553-6 5.702 0 3.148 2.602 6.907 6 12.298 3.398-5.391 6-9.15 6-12.298 0-3.149-2.851-5.702-6-5.702zm0 8c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm12 14h-24l4-8h3.135c.385.641.798 1.309 1.232 2h-3.131l-2 4h17.527l-2-4h-3.131c.435-.691.848-1.359 1.232-2h3.136l4 8z"/></svg>
                    </div>
                <div className="w-4/5 pb-4 ml-4 mr-5 flex justify-between">
                    <div className="flex flex-col gap-1">
                        <h4 className="font-bold line-clamp-1 capitalize">{adr?.label}</h4>
                        <p className="text-sm line-clamp-1">{adr?.address}</p>
                    </div>
    
                </div>
                <div className="flex ml-5 justify-center items-center gap-5 h-full  !justify-self-end ">
                {/* {isRegularModalOpen&& <RegularModal onClose={()=>setIsRegularModalOpen(false)}>
     <EditSavedAddressPopup/>
  </RegularModal>} */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24 " className="w-5 h-5"
                                        onClick={(e)=>{
                                            setEditAddressLabelValue(adr?.label)
                                            setEditAddressValue(adr?.address)
                                            setEditAddressId(adr?.id)
                                            alert(adr?.id)
                                            e.preventDefault();
                                            setIsRegularModalOpen(true);
                                            
                                            
                                        }}
                    
                    ><path d="M1.439 16.873l-1.439 7.127 7.128-1.437 16.873-16.872-5.69-5.69-16.872 16.872zm4.702 3.848l-3.582.724.721-3.584 2.861 2.86zm15.031-15.032l-13.617 13.618-2.86-2.861 10.825-10.826 2.846 2.846 1.414-1.414-2.846-2.846 1.377-1.377 2.861 2.86z"

                    /></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5"
                onClick={(e)=>{
                                                                
                                                                
                                                                alert(adr?.id)
                                                                e.preventDefault();
                                                                handleSubmitdeleteAddress(adr?.id);
                                                                
                                                                
                                                                
                                                            }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
    
                    </div>
                </li>
                ))
            }
            
            
        </ul>
    </main>
    )

}

export default MyAddresses;


// for future purposes

{/* <li className="w-full pt-4 flex justify-center items-center bg-green-300">
<div className="flex justify-center items-center h-full">

<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 3c2.131 0 4 1.73 4 3.702 0 2.05-1.714 4.941-4 8.561-2.286-3.62-4-6.511-4-8.561 0-1.972 1.869-3.702 4-3.702zm0-2c-3.148 0-6 2.553-6 5.702 0 3.148 2.602 6.907 6 12.298 3.398-5.391 6-9.15 6-12.298 0-3.149-2.851-5.702-6-5.702zm0 8c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm12 14h-24l4-8h3.135c.385.641.798 1.309 1.232 2h-3.131l-2 4h17.527l-2-4h-3.131c.435-.691.848-1.359 1.232-2h3.136l4 8z"/></svg>
</div>
<div className="pb-4 ml-4 mr-5 flex justify-between border-b-2">
<div className="flex flex-col gap-1">
    <h4 className="font-bold">Work</h4>
    <p className="text-sm">jjh, hjg, D Block, Sir Chotu Ram Marg, Avantika, Sector 1, Rohini, Delhi, Delhi</p>
</div>

</div>
<div className="flex ml-5 justify-center items-center gap-5 h-full">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24 " className="w-5 h-5"><path d="M1.439 16.873l-1.439 7.127 7.128-1.437 16.873-16.872-5.69-5.69-16.872 16.872zm4.702 3.848l-3.582.724.721-3.584 2.861 2.86zm15.031-15.032l-13.617 13.618-2.86-2.861 10.825-10.826 2.846 2.846 1.414-1.414-2.846-2.846 1.377-1.377 2.861 2.86z"/></svg>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
<path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>

</div>
</li>
<li className="w-full pt-4 flex justify-center items-center">
<div className="flex justify-center items-center h-full">

<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 3c2.131 0 4 1.73 4 3.702 0 2.05-1.714 4.941-4 8.561-2.286-3.62-4-6.511-4-8.561 0-1.972 1.869-3.702 4-3.702zm0-2c-3.148 0-6 2.553-6 5.702 0 3.148 2.602 6.907 6 12.298 3.398-5.391 6-9.15 6-12.298 0-3.149-2.851-5.702-6-5.702zm0 8c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm12 14h-24l4-8h3.135c.385.641.798 1.309 1.232 2h-3.131l-2 4h17.527l-2-4h-3.131c.435-.691.848-1.359 1.232-2h3.136l4 8z"/></svg>
</div>
<div className="pb-4 ml-4 mr-5 flex justify-between">
<div className="flex flex-col gap-1">
    <h4 className="font-bold">Work</h4>
    <p className="text-sm">jjh, hjg, D Block, Sir Chotu Ram Marg, Avantika, Sector 1, Rohini, Delhi, Delhi</p>
</div>

</div>
<div className="flex ml-5 justify-center items-center gap-5 h-full">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24 " className="w-5 h-5"><path d="M1.439 16.873l-1.439 7.127 7.128-1.437 16.873-16.872-5.69-5.69-16.872 16.872zm4.702 3.848l-3.582.724.721-3.584 2.861 2.86zm15.031-15.032l-13.617 13.618-2.86-2.861 10.825-10.826 2.846 2.846 1.414-1.414-2.846-2.846 1.377-1.377 2.861 2.86z"/></svg>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
<path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>

</div>
</li> */}