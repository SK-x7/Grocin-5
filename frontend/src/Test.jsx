import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import EmptySideCart from "./components/ui/cart/EmptySideCart";
import { setIsSideCartOpen } from "./features/cartSlice";
import { setCurrentOrderId } from "./features/orderSlice";
import UpdateItemQuantityButton from "./components/cart/UpdateItemQuantityButton"
import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { createOrder } from "./apis/orderApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function Test() {
  const dispatch=useDispatch();
  const [scrollheight,setScrollHeight] = useState();
  const [customTipForDeliveryPartner,setCustomTipForDeliveryPartner] = useState(undefined);
  const [validTipAmount,setValidTipAmount] = useState(null);
  const ref=useRef();
  const [showCustomTips,setShowCustomTips] = useState(false);
  const [tipForDeliveryPartner,setTipForDeliveryPartner] = useState(undefined);
  const isSideCartOpen=useSelector((state)=>state.cart.isSideCartOpen)
  const cart=useSelector((state)=>state.cart.cart)
  const cartGrandTotal=useSelector((state)=>state.cart.grandTotal)
  const cartGrandTotalAfterDiscount=useSelector((state)=>state.cart.grandTotalAfterDiscount)
  

  
    const navigate=useNavigate();  
  
   const toggleSidebar = () => {
      dispatch(setIsSideCartOpen());
    };
    
    
    useEffect(() => {
      let height=window.scrollY||0;
      setScrollHeight(height);
      
      console.log(scrollheight,height,window,"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
      // console.log(document.body,"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
    
    
    
    }, [scrollheight])
    
    const tipYourDeliveryPartnerObject=[
      {
        img:"https://b.zmtcdn.com/data/o2_assets/2ef961c631b0b3ec214689aca4e95efd1633353812.png?output-format=webp",
        price:20,
        value:20
      },
      {
        img:"https://b.zmtcdn.com/data/o2_assets/047a7d05ee3bbad4db7e962c25d759cd1633508344.png?output-format=webp",
        price:30,
        value:30
      },
      {
        img:"https://b.zmtcdn.com/data/o2_assets/3eff26c9392c33254d314ce8758ffae51633353789.png?output-format=webp",
        price:50,
        value:50
      },

      {
        img:"https://b.zmtcdn.com/data/o2_assets/03d81bf421d41531bc222d12ff3ea52f1633353842.png?output-format=webp",
        price:"Custom",
        value:null
      },
    ]
    
    
    const handleTipChange=()=>{
      if((ref?.current?.value>9)&&(ref?.current?.value<5001)){
        setValidTipAmount(true);
      }else if(ref?.current?.value===""){
        setValidTipAmount(null);
      }else{
        
        setValidTipAmount(false);
      }
    }
    
    
    
    
    
    // order
    console.log(cart,"🔞🔞🔞🔞🔞🔞🔞🔞🔞🔞🔞🔞🔞🔞🔞🔞🔞🔞🔞🔞");
    let orderProducts=[];
    if(cart&&(cart!==undefined)&&(cart!==null)){
      cart.map((product)=>{
        const newProduct={
          productId: product.productId,
          quantity: product.quantity,
          unitPrice: product.productPriceAfterDiscount,
          totalPrice: product.totalPriceAfterDiscount
          }
        orderProducts.push(newProduct)
      })
    }
    
    if(orderProducts.length){
      console.log(orderProducts,"(*/ω＼*)(*/ω＼*)(*/ω＼*)(*/ω＼*)(*/ω＼*)(*/ω＼*)(*/ω＼*)(*/ω＼*)(*/ω＼*)(*/ω＼*)(*/ω＼*)(*/ω＼*)(*/ω＼*)(*/ω＼*)(*/ω＼*)(*/ω＼*)(*/ω＼*)(*/ω＼*)(*/ω＼*)(*/ω＼*)(*/ω＼*)(*/ω＼*)(*/ω＼*)")
    }
    // order
    
    
    const  {isLoading,mutate}=useMutation({
      mutationFn:createOrder,
      onSuccess:(data)=>{
        console.log(data);
        if(data.status==='success'){
          dispatch(setCurrentOrderId(data.data.newOrder.id));
          toast.success("HeHe",{
            duration:1000,
          })
        navigate("/checkout");
        // queryClient.invalidateQueries("user");
        
        }
      },onError:()=>{
        
      }
    })
    
    
    function prepareOrder() {
      let orderData={
        products:orderProducts,
        deliveryFee:Number((cartGrandTotalAfterDiscount>99)?0:25),
        handlingCharge:2,
        tipForDeliveryPartner:(!isNaN(tipForDeliveryPartner)&&Number(tipForDeliveryPartner)),
        totalPrice:(!isNaN(tipForDeliveryPartner)&&Number(tipForDeliveryPartner))+2+cartGrandTotalAfterDiscount+(
          (cartGrandTotalAfterDiscount>99?0:25))
    }
      
      console.log(orderData,"[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*")
      mutate(orderData);
    }
    
    
    

    
    return (
      
      <div className="z-50 !w-full overflow-x-hidden ">
          
            {/* <div className={`w-full ${isOpen?'bg-black/70':''}`}>
                <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque aspernatur corporis nemo reprehenderit architecto veniam in nihil error excepturi vero sunt necessitati Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem ex eveniet quis porro hic sequi incidunt illo minus non optio quia dolorum asperiores quae dignissimos, natus neque deserunt soluta! Nihil?</span>
        <button onClick={(e)=>{e.preventDefault();toggleSidebar()}}>yoo</button>
            </div> */}
        {/* <div className="flex flex-col min-h-screen bg-green-200 w-3/12 absolute top-0 right-0 translate-x-full"> */}
        {/* <div className="flex flex-col min-h-screen bg-green-200 w-3/12 absolute top-0 right-0 translate-x-0"> */}
        <div className={`shadow-md shadow-gray-400 ease-in-out transition-opacity transform duration-200 ${isSideCartOpen?`z-50 !flex flex-col min-h-screen bg-slate-200 lg:w-96 sm:w-full  !fixed !top-[${scrollheight}px] !-translate-y-[${scrollheight}px] !right-0 translate-x-0 ease-in`:'flex flex-col min-h-screen bg-slate-200 w-3/12 z-50 absolute top-0 right-0 translate-x-full hidden ease-out'}`}>
          {/* Main content goes here */}
            
          <div className="flex items-center bg-white justify-between px-4 py-4 w-full fixed top-0 z-20">
<span className="font-semibold">My Cart</span>
<button onClick={toggleSidebar} className=" font-bold text-black  rounded-sm  focus:outline-none text-sm">
X
</button>

</div>
  
            {cart.length===0&& 
            <EmptySideCart toggleSidebar={toggleSidebar} />
          }
          {cart.length!==0 && 
<div className="w-full bg-[#efefef] px-3 flex flex-col !gap-3 py-3 !z-10 absolute top-14 overflow-y-scroll bottom-40">
  {/* your total savings */}
  {
    ((cartGrandTotal-cartGrandTotalAfterDiscount)>20)  &&
    
  <div className=" w-full bg-blue-200 flex justify-between items-center p-[8px] rounded-lg text-blue-700 font-semibold ring-2 ring-blue-100 mt-1">
    <span className="text-[13px]">Your total savings</span>
    <span className="text-[13px]">₹ {cartGrandTotal-cartGrandTotalAfterDiscount}</span>
  </div>
  }
  {/* your total savings */}
  {/* Delivery in 14 minutes */}
  <div className="w-full bg-white rounded-lg">
    
          <div className="py-3 flex pl-3 items-center gap-4">
            <div className="!h-12 !w-12 flex
            justify-center items-center">
              <img className="!h-full !w-full" src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=180/assets/eta-icons/30-mins-filled.png"/>
            </div>
            <div className="flex flex-col h-full">
              <span className="text-[15px] font-semibold">Delivery in 18 minutes</span>
              <span className="text-xs">Shipment of {cart?.length} items</span>
            </div>
          </div>
          {/* products  */}
          <div className="bg-white w-full px-3  flex flex-col gap-3 pb-3 rounded-b-lg">
            {
              cart?.map((product)=>(
                <div className="bg-white w-full flex justify-between rounded-lg" key={product?._id}>
                <div className="h-[70px] w-[70-px] object-contain flex justify-center items-center  ">
                  <img className="h-4/5 w-full" src={`http://localhost:4000/productImages/${product?.productImageUrl}`}/>
                </div>
                <div className="flex flex-col text-xs justify-start w-1/2 gap-[1px] pt-1">
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
                <div className="flex justify-center items-center !justify-self-end  pr-1">
                  
                <UpdateItemQuantityButton  
                              productId={product?.productId}
                            currentQuantityOfProduct={product?.quantity}
                        
                />
                </div>
                
              </div>
              ))
            }
          </div>
          {/* products  */}
  </div>
    {/* Delivery in 14 minutes */}
  
  {/* bill details div  */}
  <div className="w-full bg-white rounded-lg flex flex-col p-3">
    <h1 className="mb-2">Bill details</h1>
    <div className="w-full  flex justify-between">
      
    
    <div className="flex justify-center items-center gap-1">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
</svg>





      <span className="text-xs">Sub total</span>
      <span className="!text-[11px] bg-blue-50 text-blue-600 font-semibold px-1 pt-[1px]" >Saved ₹{cartGrandTotal-cartGrandTotalAfterDiscount}</span>
  </div>
  <div className="flex">
    <span className="text-[13px]">₹{cartGrandTotalAfterDiscount}</span>
  </div>
  </div>
  {/* 2 */}
    <div className="w-full  flex justify-between">
      
    
    <div className="flex justify-center items-center gap-1">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
  <path d="M2.908 2.067A.978.978 0 0 0 2 3.05V8h6V3.05a.978.978 0 0 0-.908-.983 32.481 32.481 0 0 0-4.184 0ZM12.919 4.722A.98.98 0 0 0 11.968 4H10a1 1 0 0 0-1 1v6.268A2 2 0 0 1 12 13h1a.977.977 0 0 0 .985-1 31.99 31.99 0 0 0-1.066-7.278Z" />
  <path d="M11 13a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM2 12V9h6v3a1 1 0 0 1-1 1 2 2 0 1 0-4 0 1 1 0 0 1-1-1Z" />
  <path d="M6 13a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
</svg>




      <span className="text-xs">Delivery charge</span>
  </div>
  <div className="flex gap-1">
    {(cartGrandTotalAfterDiscount>99)&&
    <span className="text-[13px] line-through">₹15</span>
    }
    
    
    {
      (cartGrandTotalAfterDiscount>99)?
      <span className="text-[13px] text-blue-600 font-normal shadow-blue-400 !shadow-2xl">FREE</span>:
      <span className="text-[13px]">₹25</span>
    }

  </div>
  </div>
  {/* 3 */}
    <div className="w-full  flex justify-between">
      
    
    <div className="flex justify-center items-center gap-1">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
  <path fillRule="evenodd" d="M5 4a3 3 0 0 1 6 0v1h.643a1.5 1.5 0 0 1 1.492 1.35l.7 7A1.5 1.5 0 0 1 12.342 15H3.657a1.5 1.5 0 0 1-1.492-1.65l.7-7A1.5 1.5 0 0 1 4.357 5H5V4Zm4.5 0v1h-3V4a1.5 1.5 0 0 1 3 0Zm-3 3.75a.75.75 0 0 0-1.5 0v1a3 3 0 1 0 6 0v-1a.75.75 0 0 0-1.5 0v1a1.5 1.5 0 1 1-3 0v-1Z" clipRule="evenodd" />
</svg>



      <span className="text-xs">Handling charge</span>
  </div>
  <div className="flex">
    <span className="text-[13px]">₹2</span>
  </div>
  </div>
  {/* 4 */}
  {
    
    (tipForDeliveryPartner!==null&&tipForDeliveryPartner!==undefined)&&
    
    <div className="w-full  flex justify-between">
      
    
    <div className="flex justify-center items-center gap-1">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
</svg>




      <span className="text-xs">Tip for your delivery partner</span>
  </div>
  <div className="flex">
    <span className="text-[13px]">{tipForDeliveryPartner&&"₹"}{tipForDeliveryPartner}</span>
  </div>
  </div>
  }
  
  

  {/* 5 */}
    <div className="w-full  flex justify-between mt-2">
      
    
    <div className="flex justify-center items-center gap-1">




      <span className="text-[13px] capitalize w-full">Grand total</span>
  </div>
  <div className="flex">
    <span className="text-[15px]">₹{(!isNaN(tipForDeliveryPartner)&&Number(tipForDeliveryPartner))+2+cartGrandTotalAfterDiscount+(
      (cartGrandTotalAfterDiscount>99?0:25)
    )}</span>
  </div>
  </div>
  {
    ((cartGrandTotal-cartGrandTotalAfterDiscount)>20)  &&
    
  <div className=" w-full bg-blue-200 flex justify-between items-center p-[8px] rounded-lg text-blue-700 font-semibold ring-2 ring-blue-100 mt-1">
    <span className="text-[13px]">Your total savings</span>
    <span className="text-[13px]">₹ {cartGrandTotal-cartGrandTotalAfterDiscount}</span>
  </div>
  }
  </div>
  {/* bill details div  */}
  
  
  {/* tip div  */}
  <div className="w-full bg-white rounded flex flex-col p-3 gap-3">
    <div className="flex">
      <div className="flex flex-col w-5/6">
        <h1 className="text-[17px]">Tip your delivery partner</h1>
        <p className="text-xs">Your kindness means a lot! 100% of your tip will go directly to your delivery partner.</p>
      </div>
      
      {
        (tipForDeliveryPartner!==undefined)&&
        
      <div className="flex flex-col pt-1 pl-4">
        <span className="text-xs">₹ {tipForDeliveryPartner}</span>
        <button className="text-xs text-green-700 font-medium" onClick={(e)=>{e.preventDefault;setTipForDeliveryPartner(undefined)}}>Clear</button>
      </div>
      }
      
      
      
    </div>
    
    {/* tip selectors */}
    {/* FIXME */}
    
    
    
    {!showCustomTips&&
    <div className="flex justify-center items-center w-full gap-2  ">
      
      {
        tipYourDeliveryPartnerObject.map((tip)=>(
          <button className="flex justify-center items-center px-3 border py-2 rounded-xl !h-11 gap-1" key={tip?.price} onClick={(e)=>{e.preventDefault();
          if(tip?.value!==null&&tip?.value!==undefined){
            
            setTipForDeliveryPartner(tip?.value);
          }else{
            setShowCustomTips(true);
          }
        }}>
          <div className="h-5 w-5 object-contain">
            <img src={tip?.img}/>
          </div>
          <span className="text-[13px]">{(tip?.value!==null)&&"₹"}{tip?.price}</span>
        </button>
        ))
      }
      
  
    </div>
    }
      {/* FIXME */}
      
    {showCustomTips && 
    <>
        <div className="flex justify-between items-center">
    <div className="flex flex-col justify-center items-center px-5 border !pt-[2px] rounded-xl !h-11  bg-green-100 border-green-500 box-content" >
          <div className="h-5 w-5 object-contain flex justify-center items-center">
            <img src={tipYourDeliveryPartnerObject[3].img}/>
          </div>
          <span className="text-[13px]">{tipYourDeliveryPartnerObject[3]?.price}</span>
        </div>
        <div className="flex w-4/6">
    
    <input ref={ref} type="number" min={10} max={5000} className="!border-t-0 !border-x-0 !outline-0  focus:!outline-none focus:outline-white focus:ring focus:ring-white active:!outline-none  w-3/4 text-[13px]" onChange={(e)=>{e.preventDefault();handleTipChange();setCustomTipForDeliveryPartner(customTipForDeliveryPartner)}}/>
  
    <button className="flex flex-col justify-center items-center text-[12px] capitalize" onClick={(e)=>{e.preventDefault();
      if(validTipAmount===true){
        
        setTipForDeliveryPartner(ref?.current?.value);
      }
      setValidTipAmount(null)
      setShowCustomTips(false);
    
    }}
        
        >
      
      {(validTipAmount===true)&&"Add"}
      {(validTipAmount===false||(validTipAmount===null))&&"Close"}
    </button>
        </div>
    </div>
    <span className="text-[9.5px] flex justify-end -mt-3 text-red-600 ">
      {(validTipAmount===false)&&"Amount must be greater than 9 and less than 5001"}
      </span>
    </>
    }

  </div>
  {/* tip div  */}
  {/* cancellation policy div     */}
  <div className="w-full bg-white rounded flex flex-col p-3 gap-1">
    <h1 className="text-[15px] font-semibold">Cancellation Policy</h1>
    <p className="text-xs">Orders cannot be cancelled once packed for delivery. In case of unexpected delays, a refund will be provided, if applicable.</p>
  </div>
  {/* cancellation policy div     */}
  </div>
  }
    {/* try div  */}
    {cart.length!==0&&
    
    <div className="w-full bg-white flex flex-col fixed bottom-0 z-20">
      <div className="!w-full py-3 px-6 flex justify-between border-b">
        <div className="w-full flex">
        <div className="flex justify-center items-center mr-3">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
</svg>

        </div>
        <div className="flex flex-col">
          <span className="text-[13px]">Delivering to Home</span>
          <span className="text-[11px]">fjbfj, ryur Kolkata West Bengal, India</span>
        </div>
        </div>
        <div className="flex justify-center items-center text-green-800 font-semibold" >
          <span className="text-xs">Change</span>
        </div>
      </div>
      <div className="w-full pt-3 px-4 pb-6">
        <div className="bg-green-700 flex py-[10px] px-3 justify-between items-center rounded-lg">
          <div className="flex flex-col">
            <span className="text-[15px] text-white">₹ {(!isNaN(tipForDeliveryPartner)&&Number(tipForDeliveryPartner))+2+cartGrandTotalAfterDiscount+(
      (cartGrandTotalAfterDiscount>99?0:25)
    )}</span>
            <span className="text-[11px] text-white">Total</span>
          </div>
          <div className="flex justify-center items-center gap-[1px]">
            <button className="text-white" disabled={isLoading} onClick={(e)=>{
              e.preventDefault();
              prepareOrder();
            }}>Proceed To Pay</button>
            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={0} stroke="white" className="w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
</svg>

          </div>
        </div>
      </div>
    </div>
    }
    {/* try div  */}
        </div>
        </div>
      );
    }


export default Test





























{/* <div className="flex items-center bg-white justify-between px-4 py-4">
<span className="font-semibold">My Cart</span>
<button onClick={toggleSidebar} className=" font-bold text-black  rounded-sm  focus:outline-none text-sm">
X
</button>

</div>

{/* empty cart div  */}
{/* <div className=" w-full px-2 flex flex-col">

<div className="!bg-white flex flex-col items-center justify-start rounded-md h-min min-h-min p-4 my-4">
<div className="object-cover w-auto !h-40 flex justify-center items-center mt-1">
  <img className=" h-full w-full" src="https://www.clipartkey.com/mpngs/m/44-445278_shopping-lady-in-supermarket-clipart-image-for-free.png"/>
</div>
<h1 className="text-lg h-full font-semibold mt-5">You don&apos;t have any items in your cart</h1>
<span className="text-sm text-gray-700 mb-5">Your favourite items are just a click away</span>
<button className="bg-blue-700 text-white px-5 py-3 text-xs tracking-widest rounded-lg">Start Shopping</button>
</div>
</div>  */}