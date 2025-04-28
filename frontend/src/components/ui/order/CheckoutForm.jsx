// import {loadStripe} from '@stripe/stripe-js';
// import {
//   EmbeddedCheckoutProvider,
//   EmbeddedCheckout,
// } from '@stripe/react-stripe-js';
// // import {
// //   EmbeddedCheckoutProvider,
// //   EmbeddedCheckout,
// //   Elements
// // } from '@stripe/react-stripe-js';
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
// import { useMutation} from "@tanstack/react-query";
// import { useEffect } from "react";
import { getCheckOutSession } from "../../../apis/orderApi";
import { API_URL } from "../../../utils/constants";
import { useParams } from "react-router-dom";
// import { STRIPE_APIURL } from '../../../utils/constants';
// import "../../../styles/payment.css"


// const stripePromise = loadStripe(`${STRIPE_APIURL}`);
// let obj={
//   "products": [
//     {
//       "price_data": {
//         "currency": "inr",
//         "unit_amount": "100",
//         "product_data": {
//           "name": "Tour"
//         }
//       },
//       "quantity": 1
//     }
//   ]
// }
function CheckoutForm() {
  
  const params = useParams()
  const id = params.id
  const products=useSelector((state)=>state.cart.cart)
  const currentOrderId=useSelector((state)=>state.order.currentOrderId)

  console.log(products);
  const line_Items=products?.map((product)=>({
    "price_data": {
      "currency": "inr",
      "product_data": {
        "name": product?.productName,
        "images":[`${API_URL}/productImages/${product?.productImageUrl}`]
      },
      "unit_amount": Math.round(product?.productPriceAfterDiscount*100),
    },
    "quantity": product?.quantity
  }))
  
  const obj = {
    line_Items,
    orderId: id || currentOrderId
  }
  

  
  // const{isLoading,isSuccess}=useQuery({
  //   queryKey:["getCheckOutSession",obj],
  //   queryFn:()=>getCheckOutSession(obj),
  //   onSuccess:(data)=>{
  //     console.log(data);
  //   }
  // })
  const{isLoading,isSuccess}=useQuery({
    queryKey:["getCheckOutSession"],
    queryFn:()=>getCheckOutSession(obj),
    onSuccess:(data)=>{
      console.log(data);
    }
  })
  // const{mutate,data,isLoading,isSuccess}=useMutation({
  //   mutationFn:getCheckOutSession,
  //   mutationKey:"getCheckOutSession",
  //   onSuccess:(data)=>{
  //     console.log(data);

  //   }
  // })
  //FIXME - usequery
  //FIXME - obj useeffect
  //FIXME - return
  //FIXME - orders
  //FIXME -checkout confirm
  // useEffect(() => {
  //   mutate(obj);
  // }, [mutate])
  
  
  // let clientSecret=""
  // if(isLoading===false&&isSuccess===true){
  //   clientSecret=data?.clientSecret;
  //   // console.log(clientSecret)
  // }
  
  // console.log(data);
  // const fetchClientSecret=data;
  
    // const fetchClientSecret = useCallback(async() => {
    //     // Create a Checkout Session
        
    //     let obj={
    //         "products": [
    //           {
    //             "price_data": {
    //               "currency": "inr",
    //               "unit_amount": "100",
    //               "product_data": {
    //                 "name": "Tour"
    //               }
    //             },
    //             "quantity": 1
    //           }
    //         ]
    //       }
          
    //     const session= await axios.post(`${API_URL}/api/v1/orders/checkout/sessions`,obj,{
    //         withCredentials:true
    //     })
    //     console.log(session);
    //     console.log(session.data.session.id);
        // return session.data.session.client_secret;
        
        //STUB - 
        // window.location.assign(session.data.session.return_url);
        // await axios.post(`${API_URL}/api/v1/orders/checkout-session`,obj,{
        //     withCredentials:true
        // }).then((res) => res.json())
        //   .then((data) => data.clientSecret);
        //STUB
      // }, []);
    
      // const options = fetchClientSecret;
    
        
        
        if(isLoading===false&&isSuccess===true){
          // return <div id="checkout">
          return <div></div>
          
          // <EmbeddedCheckoutProvider
          // // <div id="checkout">
          // stripe={stripePromise}
          // options={{clientSecret}}
          // >
          // <EmbeddedCheckout id='stripe-element'  className= '!bg-black !h-screen'/>
          // </EmbeddedCheckoutProvider>
          }
          // else{
            
          // }
        }

          

export default CheckoutForm
