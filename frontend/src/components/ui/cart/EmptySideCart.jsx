/* eslint-disable react/prop-types */


function EmptySideCart({toggleSidebar}) {
    return (
        
<div className=" !w-full px-2 flex flex-col mt-12">
              
              <div className="!bg-white flex flex-col items-center justify-start rounded-md h-min min-h-min p-4 my-4">
                <div className="object-cover w-auto !h-40 flex justify-center items-center mt-1">
                  <img className=" h-full w-full" src="https://www.clipartkey.com/mpngs/m/44-445278_shopping-lady-in-supermarket-clipart-image-for-free.png"/>
                </div>
                <h1 className="text-lg h-full font-semibold mt-5">You don&apos;t have any items in your cart</h1>
                <span className="text-sm text-gray-700 mb-5">Your favourite items are just a click away</span>
                <button className="bg-blue-700 text-white px-5 py-3 text-xs tracking-widest rounded-lg" onClick={(e)=>{e.preventDefault();toggleSidebar();}}>Start Shopping</button>
              </div>
            </div>
        
    )
}

export default EmptySideCart
