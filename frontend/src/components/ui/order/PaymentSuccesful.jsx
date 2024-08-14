import { NavLink } from "react-router-dom"
import Header from "../Header"

function PaymentSuccesful() {
    
    
    
    console.log("👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽")
    
    return (
        <>
        <Header/>
        <div className="w-full flex justify-center items-center py-4">
            <section className="bg-sky-100 flex  justify-center items-center !h-4/5 !w-1/2 rounded-2xl">
                <div className="bg-white h-2/3 w-1/2 flex flex-col justify-center items-center rounded-xl !py-5">
        
                    <div className="flex justify-center items-center border-2 border-double rounded-full border-[#16CCAB] mb-5">
                        <img src="src/images/done.png" alt="payment-icon" className="h-20 w-20 object-cover p-[8px]"/>
                    </div>
                    <div className="flex flex-col justify-start items-center">
                    {/* <h1 className="text-4xl mb-[10px]">₹1,18,355</h1> */}
        <h2 className="text-2xl mb-[20px]">Payment Successful!</h2>
        {/* <p className="text-base mb-[10px]">The payment has been done successfully.</p> */}
        <p className="text-base mb-[10px]">The payment has been done successfully.</p>
        {/* <p className="mb-5">Payment ID: 283848, 24 Oct,2020-11:55 PM</p> */}
        <p className="text-base mb-[10px]">Thanks for being there with us.</p>  
        <p className="mb-5 text-sm">Your order has arrived and should be delivered shortly.</p>
        {/* <NavLink to="/order/status/arrived" className="rounded-xl border py-[10px] px-5 !text-base bg-blue-200">DONE</NavLink> */}
        <NavLink to="/account/orders" className="rounded-xl border py-[10px] px-5 !text-base bg-blue-200">View Order Details</NavLink>

                    </div>
                </div>
                <div className="!h-2/3 !w-1/3 flex justify-center items-center object-contain ">
                    <img src="src/images/preview-removebg-preview.png" className="!h-full !w-full object-cover !object-right -mr-10" alt="payment-succesful-image"/>
                </div>
            </section>
        </div>
        </>
    )
}

export default PaymentSuccesful
