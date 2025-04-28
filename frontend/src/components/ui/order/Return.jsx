import { useMutation } from "@tanstack/react-query";
import {useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Navigate
  } from "react-router-dom";
import { updateOrderStatus } from "../../../apis/orderApi";
import { clearCart } from "../../../features/cartSlice";
  import { API_URL } from "../../../utils/constants";
import PaymentSuccesful from "./PaymentSuccesful";

function Return() {
  const dispatch = useDispatch();
    const [status, setStatus] = useState(null);
    const [orderUpdatedSuccessfully, setOrderUpdatedSuccessfully] = useState(false);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get('session_id');
    const currentOrderId=useSelector((state)=>state.order.currentOrderId)
    console.log(currentOrderId);
    
    const {mutate,isLoading}=useMutation({
      mutationFn:updateOrderStatus,
      onSuccess:(data)=>{
        console.log(data);
        if(data.status==="success"){
          setOrderUpdatedSuccessfully(!orderUpdatedSuccessfully);
        }
      }
    })
    
    
    useEffect(() => {
    //   const session=  axios.get(`${API_URL}/api/v1/orders/checkout/sessions/${sessionId}`,{
    //     withCredentials:true
    // })
    

    // console.log(session,"(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)")
      fetch(`${API_URL}/api/v1/orders/checkout/sessions/${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setStatus(data.status);
          if(status === 'complete'){
            console.log("x");
            let mutateObj=[
              currentOrderId,
              {
              paymentStatus:"successful",
              paymentMode:"card",
              orderStatus:"arrived",
              stripePaymentId:data.payment_intent
              
            },
          ]
            mutate(mutateObj)
          }
        });
        
    }, [sessionId,currentOrderId,mutate,status]);
  
    
    
    if (status === 'open') {
      return (
        <Navigate to="/checkout" />
      )
    }
  
    if ((status === 'complete')&&(orderUpdatedSuccessfully)&&(isLoading===false)) {
      dispatch(clearCart());
      return <PaymentSuccesful/>
      // return (
        
      //   <section id="success">
      //     <p>
      //       We appreciate your business! A confirmation email will be sent to {customerEmail}.
  
      //       If you have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>.
      //     </p>
      //   </section>
      // )
    }
  
    return null;
  }
  
  export default Return;