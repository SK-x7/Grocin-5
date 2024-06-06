import { NavLink } from "react-router-dom";
import faqData from "../../utils/faqData";

function Faqs() {
  return (
    <main>
    <h1 className="text-[18px] mb-4 font-semibold tracking-wider">FAQs</h1>
    <ul className="divide-y-2">
    {Object.keys(faqData).map((key) => (
        
        
      <li className="py-4 font-medium" key={key}>
        <NavLink className="flex justify-between" to={`/account/support/${faqData[key].id}`}>
          <h5>{faqData[key].categoryName}</h5>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

        </NavLink>
      </li>


))}
    </ul>
  </main>
  )
}

export default Faqs;
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

// export default Faqs;