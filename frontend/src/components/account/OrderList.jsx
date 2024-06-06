// import { useQuery } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import { getAllOrdersByCurrentUser } from "../../apis/orderApi";
import { useUser } from "../../hooks/useUser";
import {formatDateOfOrders} from "../../utils/orderUtils";
import {extractProductNames} from "../../utils/orderUtils";
// import { getAllOrdersByCurrentUser } from "../../apis/orderApi";
// import { useGetFetchQuery } from "../../hooks/useGetQueryData";



function OrderList() { 
    const {currentUserId}= useUser();
            console.log(currentUserId,"🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩");

    
    const {data:ordersByUser,isLoading}= useQuery(
        ["getAllOrdersByCurrentUser", currentUserId],
        () => getAllOrdersByCurrentUser(currentUserId),
        {
            enabled:!!currentUserId
        }
    )
    const orders=ordersByUser?.orders;
        console.log(orders);
    if(isLoading)   return <div>..............</div>
    
    return (
    <ul className=" w-full">
        {
            orders.map((order)=>(
                <NavLink className="w-full pt-6 flex flex-col border rounded-md" key={order?.id} to={`/account/order/${order?.id}`}>
                <div className="mb-4 mx-3 flex justify-between items-start font-medium" >
                  <p className="line-clamp-2  w-3/5">
                    {/* Mother Dairy Classic Curd (Pouch), Amul Gold Full Cream Fresh Milk
                    (Pouch) */}
                    {extractProductNames(order?.products)}
                  </p>
                  <span className="text-sm mr-2">₹{order?.totalPrice}</span>
                </div>
                <div className="mx-4 mb-3 pb-6 flex justify-between items-start text-xs">
                  <div className="flex flex-col ">
                    
                    <span>Order #{order?.id}</span>
                    <span>{formatDateOfOrders(order?.createdAt)}</span>
                    {/* <span>16/05/2024 at 10:10am</span> */}
                  </div>
                  {order?.orderStatus==="cancelled" && <span className="py-1 px-2 text-white rounded-md bg-red-500 font-medium capitalize">{order?.orderStatus}</span>
        }
        {order?.orderStatus==="arrived" && <span className="py-1 px-2 text-white rounded-md bg-blue-500 font-medium capitalize">{order?.orderStatus}</span>
        }
        {order?.orderStatus==="successful" && <span className="py-1 px-2 text-white rounded-md bg-green-500 font-medium capitalize">{order?.orderStatus}</span>
        }
                </div>
              </NavLink>
            ))
        }

    </ul>
  );
}

export default OrderList;
