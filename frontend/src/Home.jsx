import { useNavigate } from "react-router-dom";
import CategoriesFooter from "./components/ui/CategoriesFooter";
import Footer from "./components/ui/Footer";
import Header from "./components/ui/Header";
import SiteFeatures from "./components/ui/SiteFeatures";
import { useUser } from "./hooks/useUser";
import HowItWorks from "./pages/app/HowItWorks";


function Home() {
    const {value,isLoading,isFetching}=useUser();
    const navigate = useNavigate();
    if(value===false&&isFetching===false&&isLoading===false)   navigate("/login");

    return (
        <>
        <Header/>
        <SiteFeatures/>
        <HowItWorks/>
        <CategoriesFooter/>
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