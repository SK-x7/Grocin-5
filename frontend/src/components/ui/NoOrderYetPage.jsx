import { useDispatch } from "react-redux";
import { setIsSideCartOpen } from "../../features/cartSlice";

function NoOrderYetPage() {
    const dispatch=useDispatch();
    const toggleSidebar = () => {
        dispatch(setIsSideCartOpen());
      };
    return (
        <div className="!h-[96.5%] !w-full flex justify-center items-center bg-emerald-50">
            {/* <div></div> */}
            <div className="flex flex-col justify-center items-start relative top-[0%] -ml-32 w-48 left-[30%] gap-0">
                
            {/* <span className="absolute top-1/2 -ml-32 w-48 left-1/2 text-2xl">Looks like you haven&apos;t placed an <br></br> order yet!</span> */}
            <span className="w-60 left-1/2 text-3xl">Looks like you haven&apos;t placed an <br></br> order yet!</span>
            <span className="w-72 left-1/2 text-base mt-4">Make your first order.Your favourite items are just a click away.</span>
            <button className="bg-blue-700 text-white px-5 py-3 text-xs tracking-widest rounded-lg mt-10" onClick={(e)=>{
                e.preventDefault();
                toggleSidebar();
            }}>Start Shopping</button>
            </div>
            <div className="w-full  !h-full  flex justify-center items-center">
                <img src="/src/images/iNxAknqMQyG0q4FcMbNh2w-removebg-preview.png" className="object-contain"/>
            </div>
        </div>
    )
}

export default NoOrderYetPage
