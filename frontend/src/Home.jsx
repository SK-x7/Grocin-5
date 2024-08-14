import { useNavigate } from "react-router-dom";
import CategoriesFooter from "./components/ui/CategoriesFooter";
import Footer from "./components/ui/Footer";
import Header from "./components/ui/Header";
// import SiteFeatures from "./components/ui/SiteFeatures";
import { useUser } from "./hooks/useUser";
// import HowItWorks from "./pages/app/HowItWorks";


function Home() {
    const {value,isLoading,isFetching}=useUser();
    const navigate = useNavigate();
    if(value===false&&isFetching===false&&isLoading===false)   navigate("/login");

    return (
        <>
        <Header/>
        {/* <SiteFeatures/> */}
        <div className=" flex flex-col justify-center items-center h-[90vh]">
            
        <div className="h-52 w-52">
            <img src="https://www.zeptonow.com/_next/image?url=https%3A%2F%2Fcdn.zeptonow.com%2Fapp%2Fimages%2Funserviceable-graphic.png&w=256&q=75" alt="Sit_tightly_image"/>
        </div>
        <h3 className="text-lg mt-8 font-semibold">Sit Tight! We&apos;re Coming Soon!</h3>
        <p className="text-sm w-80 text-center mt-3">Our team is working tirelessly to bring 10 minute deliveries to your location</p>
        <h5 className=" w-80 text-center mt-6 pt-6 border-t-2 border-t-gray-300 font-medium">Follow Us</h5>
        <div className="mx-auto mt-4 flex w-32 justify-between"><a href="https://www.instagram.com/zeptonow/" rel="noreferrer" target="_blank"><svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="M17.3767 0H6.62299C2.97108 0 0 2.97122 0 6.62313V17.3769C0 21.0289 2.97108 24 6.62299 24H17.3767C21.0289 24 24 21.0288 24 17.3769V6.62313C24.0001 2.97122 21.0289 0 17.3767 0ZM21.8707 17.3769C21.8707 19.8548 19.8548 21.8706 17.3769 21.8706H6.62299C4.14522 21.8707 2.1294 19.8548 2.1294 17.3769V6.62313C2.1294 4.14537 4.14522 2.1294 6.62299 2.1294H17.3767C19.8546 2.1294 21.8706 4.14537 21.8706 6.62313V17.3769H21.8707ZM11.9996 5.81653C8.58961 5.81653 5.81543 8.5907 5.81543 12.0007C5.81543 15.4106 8.58961 18.1846 11.9996 18.1846C15.4096 18.1846 18.1838 15.4106 18.1838 12.0007C18.1838 8.5907 15.4096 5.81653 11.9996 5.81653ZM11.9996 16.0551C9.7639 16.0551 7.94483 14.2363 7.94483 12.0006C7.94483 9.76471 9.76376 7.94578 11.9996 7.94578C14.2355 7.94578 16.0544 9.76471 16.0544 12.0006C16.0544 14.2363 14.2353 16.0551 11.9996 16.0551ZM17.3409 4.46749C17.6306 4.17647 18.0336 4.01038 18.4439 4.01038C18.8556 4.01038 19.2587 4.17647 19.5483 4.46749C19.8393 4.75708 20.0054 5.16025 20.0054 5.57193C20.0054 5.9822 19.8393 6.38536 19.5483 6.67638C19.2573 6.96598 18.8556 7.13349 18.4439 7.13349C18.0336 7.13349 17.6305 6.96598 17.3409 6.67638C17.0498 6.38536 16.8823 5.98234 16.8823 5.57193C16.8823 5.16025 17.0497 4.75708 17.3409 4.46749Z" fill="url(#paint0_linear_26714_9695)" fillRule="evenodd"></path><path clipRule="evenodd" d="M17.3767 0H6.62299C2.97108 0 0 2.97122 0 6.62313V17.3769C0 21.0289 2.97108 24 6.62299 24H17.3767C21.0289 24 24 21.0288 24 17.3769V6.62313C24.0001 2.97122 21.0289 0 17.3767 0ZM21.8707 17.3769C21.8707 19.8548 19.8548 21.8706 17.3769 21.8706H6.62299C4.14522 21.8707 2.1294 19.8548 2.1294 17.3769V6.62313C2.1294 4.14537 4.14522 2.1294 6.62299 2.1294H17.3767C19.8546 2.1294 21.8706 4.14537 21.8706 6.62313V17.3769H21.8707ZM11.9996 5.81653C8.58961 5.81653 5.81543 8.5907 5.81543 12.0007C5.81543 15.4106 8.58961 18.1846 11.9996 18.1846C15.4096 18.1846 18.1838 15.4106 18.1838 12.0007C18.1838 8.5907 15.4096 5.81653 11.9996 5.81653ZM11.9996 16.0551C9.7639 16.0551 7.94483 14.2363 7.94483 12.0006C7.94483 9.76471 9.76376 7.94578 11.9996 7.94578C14.2355 7.94578 16.0544 9.76471 16.0544 12.0006C16.0544 14.2363 14.2353 16.0551 11.9996 16.0551ZM17.3409 4.46749C17.6306 4.17647 18.0336 4.01038 18.4439 4.01038C18.8556 4.01038 19.2587 4.17647 19.5483 4.46749C19.8393 4.75708 20.0054 5.16025 20.0054 5.57193C20.0054 5.9822 19.8393 6.38536 19.5483 6.67638C19.2573 6.96598 18.8556 7.13349 18.4439 7.13349C18.0336 7.13349 17.6305 6.96598 17.3409 6.67638C17.0498 6.38536 16.8823 5.98234 16.8823 5.57193C16.8823 5.16025 17.0497 4.75708 17.3409 4.46749Z" fill="url(#paint1_linear_26714_9695)" fillRule="evenodd"></path><defs><linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_26714_9695" x1="5.5" x2="17.5" y1="3.50798e-07" y2="23"><stopcolor stopColor="#8E20D6"></stopcolor><stop offset="1" stopColor="#E73C5E"></stop></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_26714_9695" x1="10.5" x2="6" y1="12" y2="23"><stop stopColor="#DC3A71" stopOpacity="0"></stop><stop offset="1" stopColor="#FDB551"></stop></linearGradient></defs></svg></a><a href="https://www.facebook.com/Zeptonow/" rel="noreferrer" target="_blank"><svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="M6.62299 0H17.3767C21.0289 0 24.0001 2.97122 24 6.62313V17.3769C24 21.0288 21.0289 24 17.3767 24H6.62299C2.97108 24 0 21.0289 0 17.3769V6.62313C0 2.97122 2.97108 0 6.62299 0ZM17.3769 21.8706C19.8548 21.8706 21.8707 19.8548 21.8707 17.3769H21.8706V6.62313C21.8706 4.14537 19.8546 2.1294 17.3767 2.1294H6.62299C4.14522 2.1294 2.1294 4.14537 2.1294 6.62313V17.3769C2.1294 19.8548 4.14522 21.8707 6.62299 21.8706H11.1786V15.1204H9V12.1875H11.1786V9.87681C11.1786 7.36606 12.531 6 14.5052 6C15.4513 6 16.2638 6.08044 16.5 6.11619V8.73969H15.1307C14.0571 8.73969 13.8496 9.31994 13.849 10.1676V12.1882H16.2719L15.94 15.1211H13.8496V21.8706H17.3769Z" fill="#3B5998" fillRule="evenodd"></path></svg></a><a href="https://twitter.com/ZeptoNow" rel="noreferrer" target="_blank"><svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="M6.62299 0H17.3767C21.0289 0 24.0001 2.97122 24 6.62313V17.3769C24 21.0288 21.0289 24 17.3767 24H6.62299C2.97108 24 0 21.0289 0 17.3769V6.62313C0 2.97122 2.97108 0 6.62299 0ZM17.3769 21.8706C19.8548 21.8706 21.8707 19.8548 21.8707 17.3769H21.8706V6.62313C21.8706 4.14537 19.8546 2.1294 17.3767 2.1294H6.62299C4.14522 2.1294 2.1294 4.14537 2.1294 6.62313V17.3769C2.1294 19.8548 4.14522 21.8707 6.62299 21.8706H17.3769ZM17.3965 9.16142C17.9304 9.09358 18.4425 8.95385 18.9231 8.74304C18.5628 9.27935 18.121 9.74538 17.5952 10.1185C17.6009 10.2308 17.6049 10.3439 17.6049 10.461C17.6049 13.9615 14.9395 18 10.0643 18C8.56442 18 7.17358 17.5679 6 16.8111C6.20838 16.8377 6.41677 16.8474 6.63404 16.8474C7.87304 16.8474 9.01754 16.4226 9.91892 15.7175C8.76069 15.6924 7.78662 14.9211 7.44335 13.8719C7.60408 13.9074 7.77531 13.9171 7.94492 13.9171C8.18885 13.9171 8.42388 13.8888 8.63954 13.8299C7.43527 13.5835 6.51692 12.5142 6.51692 11.2267V11.1976C6.87069 11.3923 7.28827 11.5158 7.71392 11.5239C7.00962 11.053 6.53712 10.2397 6.53712 9.32215C6.53712 8.8335 6.67119 8.37958 6.89977 7.983C8.20904 9.59112 10.158 10.6468 12.3606 10.7542C12.317 10.562 12.2992 10.36 12.2992 10.15C12.2992 8.69054 13.48 7.5 14.9468 7.5C15.7028 7.5 16.3958 7.82065 16.882 8.33838C17.4846 8.21804 18.05 8.00238 18.562 7.69708C18.365 8.31819 17.9458 8.8335 17.3965 9.16142Z" fill="#1DA1F2" fillRule="evenodd"></path></svg></a>
        </div>
        </div>
        {/* <HowItWorks/> */}
        <div className=" mx-6 pl-3 py-5 border-y-2 ">
            
        <CategoriesFooter/>
        </div>
        <Footer/>
        </>
        
    )
}

export default Home;


//             <div className="h-full flex-1 max-h-full min-h-full flex justify-center items-center bg-red-200">
//                 {/* <img alt="Logo" src="/src/images/A_creative_and_eyecatching_logo_design_for_Gro-removebg-preview.png" className="h-full w-full object-center object-cover"/> */}
//             </div>
//             {/* 2 */}
//             <div className="h-auto w-full flex flex-1 justify-center items-center bg-green-400 box-border">
//                 <button className="flex flex-1 justify-center items-center gap-1">
//                     <span>Add address</span>
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//   <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
// </svg>


//                 </button>
//             </div>
//             {/* //3 */}
//             <div className="col-span-6 flex justify-center items-center"><input placeholder="Search for something" className="w-11/12"/></div>
//             {/* //4 */}
//             <div className=" bg-fuchsia-500 flex justify-center items-center">
//                 <button className="h-1/2"><svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-auto h-full">
//   <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
// </svg>
// </button>
//             </div>
//             {/* //5 */}
//             <div className= "bg-amber-200 flex justify-center items-center h-full w-full">
//                 <button className="w-full h-1/2 flex justify-center items-center gap-1">
                    
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-full w-auto">
//   <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
// </svg>
// <span className="h-full align-middle text-center flex justify-center items-center">My Cart</span>

//                 <button/>