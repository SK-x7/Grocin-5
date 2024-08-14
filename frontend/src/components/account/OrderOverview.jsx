import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getOrder } from "../../apis/orderApi";
import { formatDateOfOrders } from "../../utils/orderUtils";
import BackButton from "../ui/buttons/BackButton";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseItemQuantityByValue,
  increaseItemQuantityByValue,
} from "../../../src/features/cartSlice";
import {
  addToReOrders,
  removeFromReOrders,
  setCurrentOrderId
} from "../../../src/features/orderSlice";

function OrderOverview() {
  const { orderId } = useParams();
  console.log(orderId);
  let isReordered = false;
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const reOrders = useSelector((state) => state.order.idOfReOrders);
  console.log(
    reOrders,
    "🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄👽👽👽👽👽👽👽👽👽🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄👽👽👽👽👽👽👽👽👽🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄👽👽👽👽👽👽👽👽👽🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄👽👽👽👽👽👽👽👽👽🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄👽👽👽👽👽👽👽👽👽🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄👽👽👽👽👽👽👽👽👽🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄👽👽👽👽👽👽👽👽👽🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄👽👽👽👽👽👽👽👽👽🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄👽👽👽👽👽👽👽👽👽🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄👽👽👽👽👽👽👽👽👽🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄👽👽👽👽👽👽👽👽👽🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄👽👽👽👽👽👽👽👽👽🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄👽👽👽👽👽👽👽👽👽🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄👽👽👽👽👽👽👽👽👽🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄👽👽👽👽👽👽👽👽👽🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄👽👽👽👽👽👽👽👽👽🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄👽👽👽👽👽👽👽👽👽🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄👽👽👽👽👽👽👽👽👽"
  );
  if (!reOrders.length) isReordered = false;
  if (reOrders.length > 0) {
    const isPresent = reOrders.includes(orderId);
    if (isPresent) isReordered = true;
  }

  const { data: order, isLoading } = useQuery(
    ["orderId", orderId],
    () => getOrder(orderId)
    // {
    //     enabled:!!currentUserId
    // }
  );
  // const orders=ordersByUser?.orders;
  console.log(order);
  if (isLoading) return <div>..............</div>;

  const products = order?.products.map((product) => product.productId);
  console.log(
    products,
    "🅿️®️⭕©️🅿️®️⭕©️🅿️®️⭕©️🅿️®️⭕©️🅿️®️⭕©️🅿️®️⭕©️🅿️®️⭕©️"
  );

  // Pre-processing for the re-ordering
  //SECTION

  const productsReorderData = [];
  order?.products.map((product) => {
    // console.log(product?.productId?.id);
    // console.log(product?.quantity)
    productsReorderData?.push({
      productData: product?.productId,
      productQuantity: product?.quantity,
    });
  });

  console.log(productsReorderData);

  function handleAddToCart() {
    console.log(productsReorderData, "🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔");

    if (isReordered === false) {
      dispatch(addToReOrders(orderId));
      productsReorderData.map((product) => {
        dispatch(increaseItemQuantityByValue(product));
      });
    }

    if (isReordered === true) {
      dispatch(removeFromReOrders(orderId));
      productsReorderData.map((product) => {
        dispatch(decreaseItemQuantityByValue(product));
      });
    }
  }
  // productsReorderData.map((product) => {
  //   if (isReordered === false) {
  //     dispatch(addToReOrders(orderId));
  //     dispatch(increaseItemQuantityByValue(product));
  // }

  // if (isReordered === true) {
  //     dispatch(removeFromReOrders(orderId));
  //     dispatch(decreaseItemQuantityByValue(product));
  //   }
  // });

  //!SECTION

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex justify-between items-center">
        {/* <button>Back</button> */}
        <BackButton />

        {order?.paymentStatus === "pending" &&
          order?.orderStatus === "idle" && (
            <button
              className="  py-3 px-[11.2px] border rounded-3xl flex justify-center items-center gap-1 border-black"
              onClick={(e) => {
                e.preventDefault();
                dispatch(setCurrentOrderId(order?.id));
                navigate("/checkout");
              }}
            >
              <p className="text-xs font-medium">✅ Complete payment now ➡️</p>
            </button>
          )}
        
        
        {order?.paymentStatus !== "pending" &&
            order?.orderStatus !== "idle" && (
        
        <button
          className="  py-3 px-[11.2px] border rounded-3xl flex justify-center items-center gap-1 border-black"
          onClick={(e) => {
            e.preventDefault();
            handleAddToCart();
          }}
        >
          {/* <div><img src="https://cdn.zeptonow.com/web-static-assets-prod/artifacts/10.9.15/tr:w-0.2,ar-0.2-0.2,pr-true,f-auto,q-80//images/message-circle-black-icon.svg" alt="Order again"/>
                </div> */}

          {/* {order?.paymentStatus !== "pending" &&
            order?.orderStatus !== "idle" && (
              <> */}
                <p>{!isReordered ? "➕" : "➖"}</p>
                <p className="text-xs font-medium">
                  {isReordered ? "Undo Order Again" : "Order Again"}
                </p>
              {/* </> */}
            
          {/* <p className="text-xs font-medium">Order Again{isReordered?"":""}</p> */}
        </button>)}
      </div>

      <main className="pt-4">
        <div className="p-4 flex justify-between items-start text-xs">
          <div className="flex flex-col ">
            <span className="text-base">Order #{order?.id}</span>
            <span>{formatDateOfOrders(order?.createdAt)}</span>
          </div>

          {order?.orderStatus === "cancelled" && (
            <span className="py-1 px-2 text-white rounded-md bg-red-500 font-medium capitalize">
              {order?.orderStatus}
            </span>
          )}
          {order?.orderStatus === "arrived" && (
            <span className="py-1 px-2 text-white rounded-md bg-blue-500 font-medium capitalize">
              {order?.orderStatus}
            </span>
          )}
          {order?.orderStatus === "successful" && (
            <span className="py-1 px-2 text-white rounded-md bg-green-500 font-medium capitalize">
              {order?.orderStatus}
            </span>
          )}
          {order?.orderStatus === "idle" && (
            <span className="py-1 px-2 text-black rounded-md bg-yellow-400 font-medium capitalize">
              Payment pending
            </span>
          )}
        </div>

        {order?.orderStatus === "cancelled" && (
          <div className="p-5 flex flex-col justify-center items-center bg-red-100">
            <h1 className="text-[18px] mb-2">Order Cancelled</h1>
            <h4 className="text-sm text-center">
              Your payment was not completed. Any amount if debited will get
              refunded within 3-5 days. Please try placing the order again.
            </h4>
          </div>
        )}
        {/* //FIXME  */}
        <ul className="p-4  flex flex-col divide-y-2 border-y-2">
          {products?.map((product, i) => (
            <li
              className="flex py-4 h-24 justify-start gap-5"
              key={product?.id}
            >
              <div className="h-full bg-blue-100">
                <img
                  alt="product1"
                  src={`http://localhost:4000/productImages/${product?.image}`}
                  className="object-contain h-full"
                />
              </div>
              <div className="flex flex-col  w-5/6">
                <span className="text-sm font-medium">{product?.name}</span>
                <span className="text-xs">
                  Qty: {order?.products[i]?.quantity}
                </span>
              </div>
              <span className="text-sm font-medium">
                ₹{product?.priceAfterDiscount}
              </span>
            </li>
          ))}
        </ul>
        {/* //FIXME -  */}
        <div className="flex flex-col  p-2">
          <div className="mb-4 text-[18px] font-medium">Bill Summary</div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs">
              <span>Item Total & GST</span>
              <div className="flex">
                <span>
                  ₹
                  {order?.totalPrice -
                    (order?.deliveryFee +
                      order?.handlingCharge +
                      order?.tipForDeliveryPartner)}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span>Handling Charge</span>
              <div className="flex ">
                <span className="line-through mr-1">₹10</span>
                <span className="text-[13px]">₹2</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span>Delivery Fee</span>
              <div className="flex gap-1">
                {order?.deliveryFee === 0 && (
                  <span className="text-[13px] line-through">₹25</span>
                )}

                {order?.deliveryFee === 0 ? (
                  <span className="text-[13px] text-blue-600 font-normal shadow-blue-400 !shadow-2xl">
                    FREE
                  </span>
                ) : (
                  <span className="text-[13px]">₹25</span>
                )}
                {/* <span className="line-through mr-1">₹25</span>
                        <span>₹0</span> */}
              </div>
            </div>

            {order?.tipForDeliveryPartner > 0 && (
              <div className="flex justify-between items-center text-xs">
                <span>Tip for your delivery partner</span>
                <div className="flex gap-1">
                  <span className="text-[13px]">
                    ₹{order?.tipForDeliveryPartner}
                  </span>
                </div>
              </div>
            )}
          </div>
          <hr className="my-4"></hr>
          <div className="flex flex-col">
            <div className="flex justify-between">
              <span>Total Bill</span>
              <div className="flex justify-center items-center">
                <span className="line-through mr-1 text-xs">
                  ₹
                  {order?.totalPrice -
                    order?.handlingCharge +
                    10 +
                    Number(order?.deliveryFee)}
                </span>
                <span className="text-sm">₹{order?.totalPrice}</span>
              </div>
            </div>
            <div className="flex justify-between gap-1">
              <span className="text-[11px]">Incl. all taxes and charges</span>
              <div className="flex text-[11px] py-[2px] px-[6px] bg-green-200 text-black font-semibold rounded">
                SAVED ₹34.51
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default OrderOverview;
