import { useNavigate } from "react-router-dom"

function BackButton() {
    
    const naviagte = useNavigate();
    return (
        <button className="py-1 pr-1 pl-2 text-sm border h-10 rounded-lg border-black" onClick={(e)=>{
            e.preventDefault();
            naviagte(-1);
        }}>
        <div className="h-6 w-8 flex justify-center items-center">
   
        <svg fill="black" height="24" viewBox="0 0 22 12" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M1.49927 5.85254C1.49927 5.30025 1.94698 4.85254 2.49927 4.85254H20.9997C21.552 4.85254 21.9997 5.30025 21.9997 5.85254V6.62431C21.9997 7.1766 21.552 7.62431 20.9997 7.62431H2.49927C1.94698 7.62431 1.49927 7.17659 1.49927 6.62431V5.85254Z" fill="black"></path><rect fill="black" height="2.71971" rx="1" transform="matrix(0.693307 -0.720642 0.693307 0.720642 0.000244141 5.87982)" width="8.15913"></rect><rect fill="black" height="2.71971" rx="1" transform="matrix(0.693307 0.720642 -0.693307 0.720642 1.8855 4.16025)" width="8.15913"></rect></svg>
        </div>
   
        </button>
    )
}

export default BackButton
