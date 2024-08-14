/* eslint-disable react/prop-types */
// import MyWallet from "../account/FaqQuestionAnswers";

import { createPortal } from "react-dom"

// const Button = styled.button`
//   background: none;
//   border: none;
//   padding: 0.4rem;
//   border-radius: var(--border-radius-sm);
//   transform: translateX(0.8rem);
//   transition: all 0.2s;
//   position: absolute;
//   top: 1.2rem;
//   right: 1.9rem;

//   &:hover {
//     background-color: var(--color-grey-100);
//   }

//   & svg {
//     width: 2.4rem;
//     height: 2.4rem;
//     /* Sometimes we need both */
//     /* fill: var(--color-grey-500);
//     stroke: var(--color-grey-500); */
//     color: var(--color-grey-500);
//   }
// `;


function Modal({children,onClose}) {
    return createPortal(
        <div className="fixed top-0 left-0 w-full h-screen z-[2000] bg-black/70      transition-all duration-500">
        <div className="fixed top-1/2 left-1/2 bg-white rounded-lg shadow-lg pb-[1.2rem] px-[0rem] -translate-x-1/2 -translate-y-1/2 transition-all duration-500">
            <button className="absolute top-[0.5rem] right-[0.9rem] border-none p-[0.4rem] rounded-sm translate-x-[0.8rem] transition-all duration-200 hover:bg-gray-100" onClick={onClose}><svg fill="none" height="18" viewBox="0 0 18 18" width="18" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="M15.75 9C15.75 12.7279 12.7279 15.75 9 15.75C5.27208 15.75 2.25 12.7279 2.25 9C2.25 5.27208 5.27208 2.25 9 2.25C12.7279 2.25 15.75 5.27208 15.75 9ZM5.46967 12.5303C5.17678 12.2374 5.17678 11.7626 5.46967 11.4697L7.93934 9L5.46967 6.53033C5.17678 6.23744 5.17678 5.76256 5.46967 5.46967C5.76256 5.17678 6.23744 5.17678 6.53033 5.46967L9 7.93934L11.4697 5.46967C11.7626 5.17678 12.2374 5.17678 12.5303 5.46967C12.8232 5.76256 12.8232 6.23744 12.5303 6.53033L10.0607 9L12.5303 11.4697C12.8232 11.7626 12.8232 12.2374 12.5303 12.5303C12.2374 12.8232 11.7626 12.8232 11.4697 12.5303L9 10.0607L6.53033 12.5303C6.23744 12.8232 5.76256 12.8232 5.46967 12.5303Z" fill="#130022" fillOpacity="0.4" fillRule="evenodd"></path></svg></button>
            {children}

        </div>
        </div>
    ,document.body)
}





export default Modal
