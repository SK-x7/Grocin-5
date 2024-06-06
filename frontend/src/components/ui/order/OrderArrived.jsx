import Header from "../Header"

function OrderArrived() {
    return (
        <section className="w-full !h-screen  flex flex-col">
            <Header/>
            <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="flex justify-center items-center border-2 border-double rounded-full border-[#16CCAB] mb-3">
                        <img src="/src/images/done.png" alt="payment-icon" className="h-20 w-20 object-cover p-[8px]"/>
            </div>
            <p>Order Arrived</p>
            <p className="text-4xl mb-3">Your order has arrived and should be delivered shortly</p>
            <div className="text-sm mb-1">
                <span>Delivering to: </span>
                <span>Home yugygyvguygugyg</span>
            </div>
            <div className="text-sm mb-7">
                <span>Total Amount: </span>
                <span>$308.49</span>
            </div>
            <button className="capitalize rounded-xl border py-[10px] px-5 !text-base bg-blue-200">View Order Details</button>

            </div>
        </section>
    )
}

export default OrderArrived

