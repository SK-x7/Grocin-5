import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { updateOrderStatus } from "../../../apis/orderApi";
import { clearCart } from "../../../features/cartSlice";

function PaymentPage() {
    const navigate=useNavigate();
    const dispatch = useDispatch();
    const currentOrderId=useSelector((state)=>state.order.currentOrderId)
    console.log(currentOrderId);
    
    const {mutate}=useMutation({
      mutationFn:updateOrderStatus,
      onSuccess:(data)=>{
        console.log(data);
        if(data.status==="success"){
            navigate("/order/status/arrived");
            dispatch(clearCart());
        }
      }
    })
    
    function handleClickOnPod() {
        let mutateObj=[
            currentOrderId,
            {
            paymentStatus:"successful",
            paymentMode:"pod",
            orderStatus:"successful"
          },
        ]
          mutate(mutateObj)
    }
    
    return (
        <main className="">
            <Header/>
            <section className=" w-4/6 flex justify-center items-start mx-auto mt-5">
                <div className="flex flex-col w-3/5 ">
                    <h1 className="text-2xl my-3 font-medium px-1">Select Payment Method</h1>
                    <div className="flex flex-col border rounded-xl">
                        <p className="py-5 px-6">UPI</p>
                        <hr></hr>
                        <p className="py-5 px-6">
                            <NavLink to="/stripe-checkout">Credit / Debit Card</NavLink>
                            </p>
                        <hr></hr>
                        <p className="py-5 px-6">Wallets</p>
                        <hr></hr>
                        <p className="py-5 px-6">Netbanking</p>
                        <hr></hr>
                        <p className="py-5 px-6">Pay Later</p>
                        <hr></hr>
                        <button className="py-5 px-6 flex" onClick={(e)=>{
                            e.preventDefault();
                            handleClickOnPod();
                        }}>Pay On Delivery</button>
                    </div>
                </div>
                <div className=" h-full !w-2/6 border ml-5 ">
                    <div className="!py-5 !px-6 flex flex-col !w-full ">
                        <h3 className="text-[18px]">Delivery Address</h3>
                        <p className="text-xs mt-[6px]">Home: fjbfj, ryur, Kolkata West Bengal, India, Presidency Division</p>
                    </div>
                    <div className="flex justify-between text-sm pt-4 pb-[18px] px-5 !w-full bg-neutral-100">
                        <span className="capitalize">my cart</span>
                        <span>12 items</span>
                    </div>
                    <div className="!w-full">
                        
                        
                <CartProductsList/>
                    </div>
                </div>
            </section>
        </main>
    )
}


function Header(){
    return (
        <header className="bg-sky-400 w-full h-16 min-h-16   grid grid-cols-10 grid-rows-1 justify-evenly items-center box-border sticky top-0 z-30 ">
        <div className="flex flex-1 justify-center items-center h-full">
            <img alt="Logo img" src="/src/images/x.png" className="h-full w-full  object-contain object-center "/>
        </div>
    </header>
    )
}

function CartProductsList(){
    const cart=useSelector((state)=>state.cart.cart)
    console.log(cart)
    const [showMore, setShowMore] = useState(false);
    const initialItemsCount = 4;
    
    const toggleShowMore = () => {
        setShowMore(!showMore);
      };
      
      
    const displayedItems = showMore ?cart :cart.slice(0, initialItemsCount);
    
    return (
        <div className="flex flex-col justify-start items-center !w-full">
            <ul className="!w-full divide-y-[1px]">
                {
                    displayedItems.map((product)=>(
                        <li key={product?.productId} className="!w-full">
                                            <div className="bg-white w-full flex justify-start rounded-lg" key={product?._id}>
                <div className="flex justify-center items-center !h-[70px]  w-2/12 text-xs">
                    Qty: {product?.quantity}
                </div>
                <div className="h-[70px] w-[70-px] object-contain flex justify-center items-center">
                  <img className="h-1/2 w-full" src={`http://localhost:4000/productImages/${product?.productImageUrl}`}/>
                </div>
                <div className="flex flex-col !text-xs justify-center w-1/2 gap-[1px] pt-1 ml-7">
                  <span>{product?.productName}</span>
                  <span>{product?.unit}</span>
                  <div className="flex gap-1">
                  {
                    (product?.productPrice!==product?.productPriceAfterDiscount) &&
                    
                  <span className="line-through">₹{product?.productPrice}</span>
                  }
                  <span>₹{product?.productPriceAfterDiscount}</span>
                  
                  </div>
                </div>
                
              </div>
                        </li>
                    ))
                }
            </ul>
            <button className="w-full bg-neutral-100 text-sm py-[13px] text-blue-800 font-normal" onClick={toggleShowMore}>
        {showMore ? 'Show less' : 'Show more'}
      </button>
        </div>
    );
}



export default PaymentPage
