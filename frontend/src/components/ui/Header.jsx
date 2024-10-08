// import { useState } from 'react';
import { useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useUiContext } from '../../contexts/UiContext';
import { setIsSideCartOpen } from "../../features/cartSlice";
import SelectAddressFromOptions from '../address/SelectAddressFromOptions';
import Modal from './Modal';

function Header() {
    
    
    const address = localStorage.getItem('deliveryAddress');
    // const [isModalOpen ,setIsModalOpen] =useState(false);
    const {setIsModalOpen,isModalOpen}=useUiContext();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleToggleSideCart = () => {
        dispatch(setIsSideCartOpen());
      };
    return (
        
        

        // bg-zinc-100 
        <header className="bg-sky-400 w-full h-16 min-h-16   grid grid-cols-10 grid-rows-1 justify-evenly items-center box-border sticky top-0 z-30 ">
            
            
            { 
            isModalOpen&&<Modal onClose={()=>setIsModalOpen(false)}><SelectAddressFromOptions/></Modal>
            }
        <div className="flex flex-1 justify-center items-center h-full cursor-pointer" onClick={(e)=>{
            e.preventDefault();
            navigate("/home")
        }}>
            <img alt="Logo img" src="/src/images/x.png" className="h-full w-full  object-contain object-center "/>
        </div>
        {/* 2 */}
        <div className='col-span-2'>               
             <button className="flex flex-1 justify-center items-center gap-1  w-full">
                 <span className=' overflow-hidden text-sm !line-clamp-1'  onClick={()=>setIsModalOpen(true)}>{(address!=undefined&&address!=null)&&address} {!address&&"Add Address"}</span>
                 {/* <button onClick={
                    (e)=>{
                        e.preventDefault();
                        setIsModalOpen(true)
                        navigate("/address");
                    }
                 
                
                
                } */}
                 
                 
                 {/* >Add address</button> */}
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
</svg>


             </button></div>
        {/* 3 */}
        <div className=" col-span-5 flex justify-center items-center"><input placeholder="Search for something" className="h-1/2 w-11/12" onClick={(e)=>{
            e.preventDefault();
            navigate("/s");
            
        }}/></div>
        {/* 4 */}
        <div className=" flex justify-center items-center h-full w-full" onClick={
            (e)=>{
                e.preventDefault();
                navigate("/account");
            }
        }>
            <button className="h-1/2"><svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-auto h-full">
<path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>
</button>
        </div>
        {/* 5 */}
        <div className=" flex justify-center items-center h-full w-full relative"> <button className="w-full h-1/2  flex justify-center items-center gap-1 
         " onClick={(e)=>{e.preventDefault();handleToggleSideCart() }}>
                
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-full w-auto">
<path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
</svg>
<span className="h-full align-middle text-center flex justify-center items-center">My Cart</span>

            </button></div>
    </header>
    )
}

export default Header
