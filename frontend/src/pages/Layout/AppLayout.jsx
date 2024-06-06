import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import Test from "../../Test";
// import ProductOverviewPage from "../app/ProductOverviewPage";

function AppLayout() {
  const {value,isLoading,isFetching}=useUser();
  const navigate = useNavigate();
  if(value===false&&isFetching===false&&isLoading===false)   navigate("/login");
  const isSideCartOpen = useSelector((state) => state.cart.isSideCartOpen);
  useEffect(() => {
    if (isSideCartOpen) {
      document.body.style.overflowY = "hidden";
    }

    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, [isSideCartOpen]);

  // let [scrollHeight, setScrollHeight] = useState(null);
  // console.log(scrollHeight);
  // const scrollHeightRef=useRef(null);
  // console.log(scrollHeightRef,"nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")

  // useEffect(() => {setScrollHeight(console.log(scrollHeightRef.current)); scrollHeightRef.current.scrollTop}, []);

  console.log(
    isSideCartOpen,
    "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"
  );
  return (
    <div className="">
      {isSideCartOpen && <Test />}
      {/* <div className="z-10 w-full absolute top-0 left-0 h-full bg-black/70"></div> */}
      {/* <div className={`w-full min-w-full`}>
                        {
                            isSideCartOpen && 
                            <div className="fixed">
                          <Outlet></Outlet>
                            </div>
                        }    
                        {
                            !isSideCartOpen&&
                            <Outlet></Outlet>
                        }           
        </div> */}
      <Outlet></Outlet>
    </div>
  );
}

export default AppLayout;

{
  /* <div className={`z-40 w-full absolute top-0 left-0 h-full bg-black/75`}></div> */
}
