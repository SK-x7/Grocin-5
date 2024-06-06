import {loadStripe} from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import { useQuery } from "@tanstack/react-query";
// import { useMutation} from "@tanstack/react-query";
// import { useEffect } from "react";
import { getCheckOutSession } from "../../../apis/orderApi";


const stripePromise = loadStripe("pk_test_51PCPQ7SCYNwOSRdPc9vhilWWao77cM8GPqMMUmsj2TPitKFjkti2tziamGnuzp0xhP5oUlnoGG8SEQ1ogWxDgVDL00sC7bA33g");
let obj={
  "products": [
    {
      "price_data": {
        "currency": "inr",
        "unit_amount": "100",
        "product_data": {
          "name": "Tour"
        }
      },
      "quantity": 1
    }
  ]
}
function CheckoutForm() {

  
  const{data,isLoading,isSuccess}=useQuery({
    queryKey:["getCheckOutSession",obj],
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
  
  
  let clientSecret=""
  if(isLoading===false&&isSuccess===true){
    clientSecret=data?.clientSecret;
    // console.log(clientSecret)
  }
  
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
          return <div id="checkout">
          <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{clientSecret}}
          >
          <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
          </div>
        }
          
        }

export default CheckoutForm
