import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { logoutUser } from "../../apis/userApi";
import Header from "../../components/ui/Header";



const NavbarList=[
  {
    id:1,
    name:"My Orders",
    path:"/account/orders",
    icon:                <svg
    fill="none"
    height="24"
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.70591 12.5294L8.70591 8.76472C8.70591 6.68553 10.3914 5.00001 12.4706 5.00001V5.00001C14.5498 5.00001 16.2353 6.68553 16.2353 8.76472L16.2353 12.5294"
      stroke="black"
      strokeLinecap="round"
      strokeWidth="1.8"
    ></path>
    <path
      d="M4.6535 13.1579C4.79005 11.5194 4.85832 10.7001 5.39863 10.203C5.93895 9.70581 6.76103 9.70581 8.40521 9.70581H16.536C18.1801 9.70581 19.0022 9.70581 19.5425 10.203C20.0829 10.7001 20.1511 11.5194 20.2877 13.1579L20.7713 18.9613C20.8508 19.9152 20.8905 20.3921 20.6109 20.696C20.3313 20.9999 19.8527 20.9999 18.8954 20.9999H6.04574C5.08851 20.9999 4.6099 20.9999 4.33028 20.696C4.05065 20.3921 4.0904 19.9152 4.16989 18.9613L4.6535 13.1579Z"
      stroke="black"
      strokeWidth="1.8"
    ></path>
  </svg>
    
  },
  {
    id:2,
    name:"My Addresses",
    path:"/account/addresses",
    icon:                <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M12 3c2.131 0 4 1.73 4 3.702 0 2.05-1.714 4.941-4 8.561-2.286-3.62-4-6.511-4-8.561 0-1.972 1.869-3.702 4-3.702zm0-2c-3.148 0-6 2.553-6 5.702 0 3.148 2.602 6.907 6 12.298 3.398-5.391 6-9.15 6-12.298 0-3.149-2.851-5.702-6-5.702zm0 8c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm12 14h-24l4-8h3.135c.385.641.798 1.309 1.232 2h-3.131l-2 4h17.527l-2-4h-3.131c.435-.691.848-1.359 1.232-2h3.136l4 8z" />
  </svg>
    
  },
  {
    id:3,
    name:"My Profile",
    path:"/account/profile",
    icon:               <svg
    fill="none"
    height="24"
    viewBox="0 0 26 26"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="12.5"
      cy="11.168"
      r="3.5"
      stroke="black"
      strokeLinecap="round"
      strokeWidth="1.6"
    ></circle>
    <circle
      cx="12.5"
      cy="13.5"
      r="10.5"
      stroke="black"
      strokeWidth="1.6"
    ></circle>
    <path
      d="M19.5 21.3236C19.0871 20.0832 18.1773 18.9872 16.9117 18.2054C15.646 17.4237 14.0953 17 12.5 17C10.9047 17 9.35398 17.4237 8.08835 18.2054C6.82271 18.9872 5.91289 20.0832 5.5 21.3236"
      stroke="black"
      strokeLinecap="round"
      strokeWidth="1.6"
    ></path>
  </svg>
    
  },
  {
    id:4,
    name:"My Wallet",
    path:"/account/wallet",

    icon:                <svg
    fill="none"
    height="24"
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.75 6V18C3.75 18.3978 3.90804 18.7794 4.18934 19.0607C4.47064 19.342 4.85218 19.5 5.25 19.5H20.25C20.4489 19.5 20.6397 19.421 20.7803 19.2803C20.921 19.1397 21 18.9489 21 18.75V8.25C21 8.05109 20.921 7.86032 20.7803 7.71967C20.6397 7.57902 20.4489 7.5 20.25 7.5H5.25C4.85218 7.5 4.47064 7.34196 4.18934 7.06066C3.90804 6.77936 3.75 6.39782 3.75 6ZM3.75 6C3.75 5.60218 3.90804 5.22064 4.18934 4.93934C4.47064 4.65804 4.85218 4.5 5.25 4.5H18"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
    ></path>
    <path
      d="M16.875 14.625C17.4963 14.625 18 14.1213 18 13.5C18 12.8787 17.4963 12.375 16.875 12.375C16.2537 12.375 15.75 12.8787 15.75 13.5C15.75 14.1213 16.2537 14.625 16.875 14.625Z"
      fill="white"
    ></path>
  </svg>
    
  
    
  },

  {
    id:5,
    name:"Customer Support",
    path:"/account/support",

    icon:                <svg
    fill="none"
    height="24"
    viewBox="0 0 26 26"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 13C3 7.47715 7.47715 3 13 3V3C18.5228 3 23 7.47715 23 13V19.3636C23 20.4219 23 20.951 22.8424 21.3737C22.589 22.0531 22.0531 22.589 21.3737 22.8424C20.951 23 20.4219 23 19.3636 23H13C7.47715 23 3 18.5228 3 13V13Z"
      stroke="black"
      strokeWidth="1.6"
    ></path>
    <path
      d="M9.25 11.75L16.75 11.75"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
    ></path>
    <path
      d="M13 16.75H16.75"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
    ></path>
  </svg>
    
  },
] 




function ProfilePage() {
  
  const [activeNavItem,setActiveNavItem]=useState(1);
  return (
    <div>
      <Header />
      <section className="h-screen flex justify-center items-start py-10 rounded-2xl">
        <div className=" w-4/5 h-full flex border rounded-2xl">
          <div className="bg-white h-full w-2/6 flex flex-col px-3 py-3 rounded-2xl">
            <div className="px-3 mb-4">
              <h1>My Account</h1>
              <h2 className="mt-1">+91 9680552108</h2>
            </div>
            <hr className="bg-black h-[2px]"></hr>
            <ul className="py-3">
              
            {
              NavbarList.map(navbarItem=>(
                <NavLink to={`${navbarItem.path}`} className={` h-16 px-6 flex items-center rounded-xl ${activeNavItem===navbarItem?.id?'bg-green-100':'bg-transparent'}`} key={navbarItem?.id} onClick={()=>{
                  // e.preventDefault();
                  setActiveNavItem(navbarItem?.id);
                }
                }>
                  {navbarItem?.icon}
                <span className="p-5">{navbarItem?.name}</span>
              </NavLink>
              ))
            }
              
              

              {/* <NavLink to="/account/support" className="bg-green-100 h-16 px-6 flex items-center rounded-xl">
                <svg
                  fill="none"
                  height="24"
                  viewBox="0 0 26 26"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 13C3 7.47715 7.47715 3 13 3V3C18.5228 3 23 7.47715 23 13V19.3636C23 20.4219 23 20.951 22.8424 21.3737C22.589 22.0531 22.0531 22.589 21.3737 22.8424C20.951 23 20.4219 23 19.3636 23H13C7.47715 23 3 18.5228 3 13V13Z"
                    stroke="black"
                    strokeWidth="1.6"
                  ></path>
                  <path
                    d="M9.25 11.75L16.75 11.75"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.6"
                  ></path>
                  <path
                    d="M13 16.75H16.75"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.6"
                  ></path>
                </svg>
                <span className="p-5">Customer Support</span>
              </NavLink> */}
            </ul>
            <hr className="bg-black h-[2px]"></hr>
            <button onClick={
              (e)=>{
                e.preventDefault();
                logoutUser();
              }
            } className="mx-auto mt-4">Log Out</button>
          </div>

          <div className=" !h-full w-4/6 overflow-y-scroll">
            <section className="my-4 p-5 !h-full ">
              <Outlet/>
              {/* <OrderList/>
              <OrderOverview/>
              <MyAddresses/>
              <MyWallet/>
              <Myprofile/> */}
              {/* <Faqs/> */}
              {/* <FaqsQuestions/> */}
              {/* <FaqQuestionAnswers/> */}
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
              {/* <NavLink to="/account/support" className="bg-green-100 h-16 px-6 flex items-center rounded-xl">
                <svg
                  fill="none"
                  height="24"
                  viewBox="0 0 26 26"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 13C3 7.47715 7.47715 3 13 3V3C18.5228 3 23 7.47715 23 13V19.3636C23 20.4219 23 20.951 22.8424 21.3737C22.589 22.0531 22.0531 22.589 21.3737 22.8424C20.951 23 20.4219 23 19.3636 23H13C7.47715 23 3 18.5228 3 13V13Z"
                    stroke="black"
                    strokeWidth="1.6"
                  ></path>
                  <path
                    d="M9.25 11.75L16.75 11.75"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.6"
                  ></path>
                  <path
                    d="M13 16.75H16.75"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.6"
                  ></path>
                </svg>
                <span className="p-5">Customer Support</span>
              </NavLink> */}


// function OrderList(){
//     return                             <ul className=" w-full">
//     <li className="w-full pt-6 flex flex-col border rounded-md">
//         <div className="mb-4 mx-3 flex justify-between items-start font-medium">
//             <p className="line-clamp-2  w-3/5">Mother Dairy Classic Curd (Pouch), Amul Gold Full Cream Fresh Milk (Pouch)</p>
//             <span className="text-sm">₹110.67</span>
//         </div>
//         <div className="mx-4 mb-3 pb-6 flex justify-between items-start text-xs">
//             <div className="flex flex-col ">
//                 <span>Order #4BC73DRRE75437</span>
//                 <span>16/05/2024 at 10:10am</span>
//             </div>
//             <span className="py-1 px-2 text-white rounded-md bg-red-500 font-medium">Cancelled</span>
//         </div>
//     </li>
//     <li className="w-full pt-6 flex flex-col border rounded-md">
//         <div className="mb-4 mx-3 flex justify-between items-start font-medium">
//             <p className="line-clamp-2  w-3/5">Mother Dairy Classic Curd (Pouch), Amul Gold Full Cream Fresh Milk (Pouch)</p>
//             <span className="text-sm">₹110.67</span>
//         </div>
//         <div className="mx-4 mb-3 pb-6 flex justify-between items-start text-xs">
//             <div className="flex flex-col ">
//                 <span>Order #4BC73DRRE75437</span>
//                 <span>16/05/2024 at 10:10am</span>
//             </div>
//             <span className="py-1 px-2 text-white rounded-md bg-blue-500 font-medium">Arrived</span>
//         </div>
//     </li>
//     <li className="w-full pt-6 flex flex-col border rounded-md">
//         <div className="mb-4 mx-3 flex justify-between items-start font-medium">
//             <p className="line-clamp-2  w-3/5">Mother Dairy Classic Curd (Pouch), Amul Gold Full Cream Fresh Milk (Pouch)</p>
//             <span className="text-sm">₹110.67</span>
//         </div>
//         <div className="mx-4 mb-3 pb-6 flex justify-between items-start text-xs">
//             <div className="flex flex-col ">
//                 <span>Order #4BC73DRRE75437</span>
//                 <span>16/05/2024 at 10:10am</span>
//             </div>
//             <span className="py-1 px-2 text-white rounded-md bg-green-500 font-medium">Delivered</span>
//         </div>
//     </li>
// </ul>
// }

// function OrderOverview() {
//     return (
//         <div className="w-full flex flex-col">
//         <div className="w-full flex justify-between items-center">
//             {/* <button>Back</button> */}
//             <button className="py-1 pr-1 pl-2 text-sm border h-10 rounded-lg border-black">
//                 <div className="h-6 w-8 flex justify-center items-center">

//                 <svg fill="black" height="24" viewBox="0 0 22 12" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M1.49927 5.85254C1.49927 5.30025 1.94698 4.85254 2.49927 4.85254H20.9997C21.552 4.85254 21.9997 5.30025 21.9997 5.85254V6.62431C21.9997 7.1766 21.552 7.62431 20.9997 7.62431H2.49927C1.94698 7.62431 1.49927 7.17659 1.49927 6.62431V5.85254Z" fill="black"></path><rect fill="black" height="2.71971" rx="1" transform="matrix(0.693307 -0.720642 0.693307 0.720642 0.000244141 5.87982)" width="8.15913"></rect><rect fill="black" height="2.71971" rx="1" transform="matrix(0.693307 0.720642 -0.693307 0.720642 1.8855 4.16025)" width="8.15913"></rect></svg>
//                 </div>

//                 </button>
//             <button className="  py-3 px-[11.2px] border rounded-3xl flex justify-center items-center gap-1 border-black">
//                 <div><img src="https://cdn.zeptonow.com/web-static-assets-prod/artifacts/10.9.15/tr:w-0.2,ar-0.2-0.2,pr-true,f-auto,q-80//images/message-circle-black-icon.svg" alt="Get Help"/></div>
//                 <p className="text-xs font-medium">Get Help</p>
//             </button>
//         </div>
//         <main className="pt-4">
//             <div className="p-4 flex justify-between items-start text-xs">
// <div className="flex flex-col ">
// <span className="text-base">Order #4BC73DRRE75437</span>
// <span>16/05/2024 at 10:10am</span>
// </div>
// <span className="py-1 px-2 text-white rounded-md bg-red-500 font-medium">Cancelled</span>
//             </div>
//             <div className="p-5 flex flex-col justify-center items-center bg-red-100">
//                 <h1 className="text-[18px] mb-2">Order Cancelled</h1>
//                 <h4 className="text-sm text-center">Your payment was not completed. Any amount if debited will get refunded within 3-5 days. Please try placing the order again.</h4>
//             </div>
//             {/* //FIXME  */}
//             <ul className="p-4  flex flex-col divide-y-2 border-y-2">
//                 <li className="flex py-4 h-24 justify-start gap-2">
//                     <div className="h-full bg-blue-100">
//                         <img alt="product1" src="https://cdn.zeptonow.com/production//cms/product_variant/ecf70f6f-0b4b-4959-9eb4-e13481be478f.jpeg" className="object-contain h-full" />
//                     </div>
//                     <div className="flex flex-col  w-5/6">
//                         <span className="text-sm font-medium">Mother Dairy Classic Curd (Pouch)</span>
//                         <span className="text-xs">Qty: 1</span>
//                     </div>
//                     <span className="text-sm font-medium">₹72</span>
//                 </li>
//                 <li className="flex py-4 h-24 justify-start gap-2">
//                     <div className="h-full bg-blue-100">
//                         <img alt="product1" src="https://cdn.zeptonow.com/production//cms/product_variant/ecf70f6f-0b4b-4959-9eb4-e13481be478f.jpeg" className="object-contain h-full" />
//                     </div>
//                     <div className="flex flex-col  w-5/6">
//                         <span className="text-sm font-medium">Mother Dairy Classic Curd (Pouch)</span>
//                         <span className="text-xs">Qty: 1</span>
//                     </div>
//                     <span className="text-sm font-medium">₹72</span>
//                 </li>
//             </ul>
//             {/* //FIXME -  */}
//             <div className="flex flex-col  p-2">
//                 <div className="mb-4 text-[18px] font-medium">Bill Summary</div>
//                 <div className="flex flex-col gap-2">
//                 <div className="flex justify-between items-center text-xs">
//                     <span >Item Total & GST</span>
//                     <div className="flex">
//                         <span>₹105.18</span>
//                     </div>
//                 </div>
//                 <div className="flex justify-between items-center text-xs">
//                     <span>Handling Charge</span>
//                     <div className="flex">
//                         <span className="line-through mr-1">₹15</span>
//                         <span>₹5</span>
//                     </div>
//                 </div>
//                 <div className="flex justify-between items-center text-xs">
//                     <span>Delivery Fee</span>
//                     <div className="flex">
//                         <span className="line-through mr-1">₹25</span>
//                         <span>₹0</span>
//                     </div>
//                 </div>
//                 </div>
//                 <hr className="my-4"></hr>
//                 <div className="flex flex-col">
//                     <div className="flex justify-between">
//                         <span>Total Bill</span>
//                         <div className="flex justify-center items-center">
//                         <span className="line-through mr-1 text-xs">₹15</span>
//                         <span className="text-sm">₹5</span>
//                     </div>
//                     </div>
//                     <div className="flex justify-between gap-1">
//                         <span className="text-[11px]">Incl. all taxes and charges</span>
//                         <div className="flex text-[11px] py-[2px] px-[6px] bg-green-200 text-black font-semibold rounded">
//                         SAVED ₹34.51
//                     </div>
//                     </div>
//                 </div>
//             </div>
//         </main>
//     </div>
//     )
// }

// function MyAddresses() {
//     return (
//         <main className="w-full divide-y-2">
//         <div className="flex justify-between items-center px-12 pb-6">
//             <h3 className="font-semibold">All Saved Addresses</h3>
//             <button className="text-sm py-3 px-7 border rounded-lg bg-blue-600 text-white  tracking-wider">Add New Address</button>
//         </div>
//         <ul className="w-full">
//             <li className="w-full pt-4 flex justify-center items-center">
//                 <div className="flex justify-center items-center h-full">

//             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 3c2.131 0 4 1.73 4 3.702 0 2.05-1.714 4.941-4 8.561-2.286-3.62-4-6.511-4-8.561 0-1.972 1.869-3.702 4-3.702zm0-2c-3.148 0-6 2.553-6 5.702 0 3.148 2.602 6.907 6 12.298 3.398-5.391 6-9.15 6-12.298 0-3.149-2.851-5.702-6-5.702zm0 8c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm12 14h-24l4-8h3.135c.385.641.798 1.309 1.232 2h-3.131l-2 4h17.527l-2-4h-3.131c.435-.691.848-1.359 1.232-2h3.136l4 8z"/></svg>
//                 </div>
//             <div className="pb-4 ml-4 mr-5 flex justify-between border-b-2">
//                 <div className="flex flex-col gap-1">
//                     <h4 className="font-bold">Work</h4>
//                     <p className="text-sm">jjh, hjg, D Block, Sir Chotu Ram Marg, Avantika, Sector 1, Rohini, Delhi, Delhi</p>
//                 </div>

//             </div>
//             <div className="flex ml-5 justify-center items-center gap-5 h-full">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24 " className="w-5 h-5"><path d="M1.439 16.873l-1.439 7.127 7.128-1.437 16.873-16.872-5.69-5.69-16.872 16.872zm4.702 3.848l-3.582.724.721-3.584 2.861 2.86zm15.031-15.032l-13.617 13.618-2.86-2.861 10.825-10.826 2.846 2.846 1.414-1.414-2.846-2.846 1.377-1.377 2.861 2.86z"/></svg>
//                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
// <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
// </svg>

//                 </div>
//             </li>
//             <li className="w-full pt-4 flex justify-center items-center">
//                 <div className="flex justify-center items-center h-full">

//             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 3c2.131 0 4 1.73 4 3.702 0 2.05-1.714 4.941-4 8.561-2.286-3.62-4-6.511-4-8.561 0-1.972 1.869-3.702 4-3.702zm0-2c-3.148 0-6 2.553-6 5.702 0 3.148 2.602 6.907 6 12.298 3.398-5.391 6-9.15 6-12.298 0-3.149-2.851-5.702-6-5.702zm0 8c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm12 14h-24l4-8h3.135c.385.641.798 1.309 1.232 2h-3.131l-2 4h17.527l-2-4h-3.131c.435-.691.848-1.359 1.232-2h3.136l4 8z"/></svg>
//                 </div>
//             <div className="pb-4 ml-4 mr-5 flex justify-between">
//                 <div className="flex flex-col gap-1">
//                     <h4 className="font-bold">Work</h4>
//                     <p className="text-sm">jjh, hjg, D Block, Sir Chotu Ram Marg, Avantika, Sector 1, Rohini, Delhi, Delhi</p>
//                 </div>

//             </div>
//             <div className="flex ml-5 justify-center items-center gap-5 h-full">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24 " className="w-5 h-5"><path d="M1.439 16.873l-1.439 7.127 7.128-1.437 16.873-16.872-5.69-5.69-16.872 16.872zm4.702 3.848l-3.582.724.721-3.584 2.861 2.86zm15.031-15.032l-13.617 13.618-2.86-2.861 10.825-10.826 2.846 2.846 1.414-1.414-2.846-2.846 1.377-1.377 2.861 2.86z"/></svg>
//                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
// <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
// </svg>

//                 </div>
//             </li>
//         </ul>
//     </main>
//     )

// }

// function MyWallet() {
//     return(
//         <main className="w-full bg-gray-100 p-4">
//         <div className="pt-3 pb-4 flex flex-col justify-center items-center">
//             <span className="text-xs">My Balance</span>
//             <span className="text-[32px]">$0</span>
//         </div>
//     </main>
//     )

// }


// function Myprofile() {
//     return (
//         <main className="flex flex-col divide-y-2">
//         <div className="flex flex-col mx-12 mt-7 mb-3 px-14">
//           <h1 className="text-[23px] tracking-wider text-blue-600 mb-[30px]">
//             YOUR ACCOUNT SETTINGS
//           </h1>
//           <form className="flex flex-col gap-8">
//             <div className="flex flex-col ">
//               <label className="mb-[10px]">Name </label>
//               <input
//                 required
//                 type="email"
//                 id="emailId"
//                 name="emailId"
//                 placeholder="Enter your email address"
//                 className="h-full w-full border-none border-opacity-0 rounded-sm focus:outline-none  focus:ring-indigo-300 focus:border-transparent text-sm bg-gray-100 py-3"
//                 label="emaildId"
//                 title=""
//               />
//             </div>
//             <div className="flex flex-col mb-6">
//               <label className="mb-[10px]">Email address </label>
//               <input
//                 required
//                 type="email"
//                 id="emailId"
//                 name="emailId"
//                 placeholder="Enter your email address"
//                 className="h-full w-full border-none border-opacity-0 rounded-sm focus:outline-none  focus:ring-indigo-300 focus:border-transparent text-sm bg-gray-100 py-3"
//                 label="emaildId"
//                 title=""
//               />
//             </div>
//             <div className="flex items-center justify-end">
//                 <button type="submit" className="text-sm tracking-wider px-[30px] py-[12.5px] border rounded-2xl bg-blue-600 text-white   ">SAVE SETTINGS</button>
//             </div>
//           </form>
//         </div>
//         <div className="flex flex-col mx-12 my-7 px-14 py-[70px]">
//           <h1 className="text-[23px] tracking-wider text-blue-600 mb-[30px] capitalize">
//             password change
//           </h1>
//           <form className="flex flex-col gap-6">
//             <div className="flex flex-col ">
//               <label className="mb-[10px]">Current password </label>
//               <input
//                 required
//                 type="email"
//                 id="emailId"
//                 name="emailId"
//                 placeholder="Enter your email address"
//                 className="h-full w-full border-none border-opacity-0 rounded-sm focus:outline-none  focus:ring-indigo-300 focus:border-transparent text-sm bg-gray-100 py-3"
//                 label="emaildId"
//                 title=""
//               />
//             </div>
//             <div className="flex flex-col">
//               <label className="mb-[10px]">New password </label>
//               <input
//                 required
//                 type="email"
//                 id="emailId"
//                 name="emailId"
//                 placeholder="Enter your email address"
//                 className="h-full w-full border-none border-opacity-0 rounded-sm focus:outline-none  focus:ring-indigo-300 focus:border-transparent text-sm bg-gray-100 py-3"
//                 label="emaildId"
//                 title=""
//               />
//             </div>
//             <div className="flex flex-col mb-6">
//               <label className="mb-[10px]">Confirm password </label>
//               <input
//                 required
//                 type="email"
//                 id="emailId"
//                 name="emailId"
//                 placeholder="Enter your email address"
//                 className="h-full w-full border-none border-opacity-0 rounded-sm focus:outline-none  focus:ring-indigo-300 focus:border-transparent text-sm bg-gray-100 py-3"
//                 label="emaildId"
//                 title=""
//               />
//             </div>
//             <div className="flex items-center justify-end">
//                 <button type="submit" className="text-sm tracking-wider px-[30px] py-[12.5px] border rounded-2xl bg-blue-600 text-white   !uppercase">save password</button>
//             </div>
//           </form>
//         </div>
//       </main>
//     )
    
// }

// function Faqs() {
//   return (
//     <main>
//     <h1 className="text-[18px] mb-4 font-semibold tracking-wider">FAQs</h1>
//     <ul className="divide-y-2">
//       <li className="py-4 font-medium">
//         <div className="flex justify-between">
//           <h5>General Inquiry</h5>
//           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
// <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
// </svg>

//         </div>
//       </li>
//       <li className="py-4 font-medium">
//         <div className="flex justify-between">
//           <h5>General Inquiry</h5>
//           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
// <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
// </svg>

//         </div>
//       </li>


//     </ul>
//   </main>
//   )
// }

// function FaqsQuestions() {
//   return (
//     <main className="flex flex-col">
//     <div className="ml-4">
//                  <button className="py-1 pr-1 pl-2 text-sm border h-10 rounded-lg border-black">
//      <div className="h-6 w-8 flex justify-center items-center">

//      <svg fill="black" height="24" viewBox="0 0 22 12" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M1.49927 5.85254C1.49927 5.30025 1.94698 4.85254 2.49927 4.85254H20.9997C21.552 4.85254 21.9997 5.30025 21.9997 5.85254V6.62431C21.9997 7.1766 21.552 7.62431 20.9997 7.62431H2.49927C1.94698 7.62431 1.49927 7.17659 1.49927 6.62431V5.85254Z" fill="black"></path><rect fill="black" height="2.71971" rx="1" transform="matrix(0.693307 -0.720642 0.693307 0.720642 0.000244141 5.87982)" width="8.15913"></rect><rect fill="black" height="2.71971" rx="1" transform="matrix(0.693307 0.720642 -0.693307 0.720642 1.8855 4.16025)" width="8.15913"></rect></svg>
//      </div>

//      </button>
//     </div>
    
//     <div className="my-6 mx-4">
//       <h4 className="mb-4 text-[18px] font-semibold tracking-wider">Coupans & Offers</h4>
//       <ul className="divide-y-2">
// <li className="py-4 font-medium">
// <div className="flex justify-between">
// <h5>General Inquiry</h5>
// <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
// <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
// </svg>

// </div>
// </li>
// <li className="py-4 font-medium">
// <div className="flex justify-between">
// <h5>General Inquiry</h5>
// <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
// <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
// </svg>

// </div>
// </li>


// </ul>
//     </div>
//   </main>
//   )
// }


// function FaqQuestionAnswers() {
//   return (
//     <main className="flex flex-col">
//     <div className="ml-4">
//                  <button className="py-1 pr-1 pl-2 text-sm border h-10 rounded-lg border-black">
//      <div className="h-6 w-8 flex justify-center items-center">

//      <svg fill="black" height="24" viewBox="0 0 22 12" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M1.49927 5.85254C1.49927 5.30025 1.94698 4.85254 2.49927 4.85254H20.9997C21.552 4.85254 21.9997 5.30025 21.9997 5.85254V6.62431C21.9997 7.1766 21.552 7.62431 20.9997 7.62431H2.49927C1.94698 7.62431 1.49927 7.17659 1.49927 6.62431V5.85254Z" fill="black"></path><rect fill="black" height="2.71971" rx="1" transform="matrix(0.693307 -0.720642 0.693307 0.720642 0.000244141 5.87982)" width="8.15913"></rect><rect fill="black" height="2.71971" rx="1" transform="matrix(0.693307 0.720642 -0.693307 0.720642 1.8855 4.16025)" width="8.15913"></rect></svg>
//      </div>

//      </button>
//     </div>
    
//     <div className="my-6 mx-4 pb-12 flex flex-col">
//       <div className="flex flex-col mb-6 border-b-2 pb-6">
        
//       <h4 className="mb-[6px] font-medium tracking-wider">Tell me a little about your rider safety initiative.</h4>
//       <span className="text-[15px]">Our model and store mapping ensure that our rider partners operate in a much smaller 3 km radius around the same dark store, building greater familiarity, safety, and comfort for our Zepto Rider Partners as well as the communities. </span>
//       </div>

//     </div>
//   </main>
//   )
// }


export default ProfilePage;
