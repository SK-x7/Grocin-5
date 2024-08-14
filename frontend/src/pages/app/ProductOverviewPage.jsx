import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct } from "../../apis/productsApi";

import CategoriesFooter from "../../components/ui/CategoriesFooter";
import Footer from "../../components/ui/Footer";
import Header from "../../components/ui/Header";
import HowItWorksSmallSize from "./HowItWorksSmallSize";
("");
import { addItem,getCurrentQuantityById} from '../../features/cartSlice';
// import UpdateItemQuantityButton from "../../components/cart/UpdateItemQuantityButton";
import UpdateItemQuantity2 from "../../components/cart/UpdateItemQuantity2";
import { useRef } from "react";

// import HowItWorks from "./HowItWorks"

function ProductOverviewPage() {
  let ref=useRef();
  const isSideCartOpen=useSelector((state)=>state.cart.isSideCartOpen)
  let [height, setHeight] = useState(null);
  useEffect(() => {
    if(isSideCartOpen){
  console.log(ref.current.offsetHeight,"⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕");
      setHeight(ref.current.offsetHeight)
    }
  
  
  
  }, [isSideCartOpen])

  const {productId}=useParams();
  const dispatch = useDispatch();
  console.log(productId);
  const [isOpen,setIsOpened]=useState(false);
  const { data: productData, isSuccess,isLoading,status } = useQuery({
    queryKey: ["getProduct",productId],
    queryFn: ()=>getProduct(productId),
  });

  // console.log(productData);
  console.log(isSuccess);

  let product = productData?.data?.product;
  const currentQuantityOfProduct = useSelector(getCurrentQuantityById(product?.id))
  console.log(currentQuantityOfProduct);
  const isINCart=currentQuantityOfProduct>0;
  // console.log(product);
  function handleAddToCart() {
    const newItem = {
      productId:product?._id,
      productName:product?.name,
      quantity: 1,
      productPrice:product?.priceAfterDiscount,
      totalPrice: product?.priceAfterDiscount * 1,
    };
    console.log(newItem,"🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔");
    dispatch(addItem(newItem));
  }
  
  // isLoading&& 
  // <div
  //   className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white mx-auto"
  //   role="status">
  //   <span
  //     className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
  //     >Loading...</span
  //   >
  // </div>
  
  
  if(isLoading) return   <div
  className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white mx-auto"
  role="status">
  <span
    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
    >Loading...</span
  >
</div>
  
  
  if(status==='error')  return <div>OOps😭😭😭😭😭😭</div>
  
  return (
    
    
      

    <div className="w-full">
      {
        isSideCartOpen && <div className={`!z-40 w-full !absolute !top-0 !bottom-0 !left-0 !bg-black/75 !h-[${height}px]`}></div>
      }
    <div className="min-w-full " ref={ref}>
      <Header />
      {/* <div className="my-72 w-1/2">
                <HowItWorks/>
            </div> */}

      <div className=" !w-full sm:bg-green-200 sm:hidden flex flex-col justify-center items-center px-4 mx-auto">
        {/* <h1 className="sm:hidden vs:block bg-red-200">hhhhhhhhh</h1> */}
        <ShowProductImage productData={product} />
        <ShowProductDetails productData={product} />
        <div className="w-full border-b-2" onClick={(e)=>{
          e.preventDefault();
          setIsOpened(!isOpen);
          console.log("clicked,🧨")
        }}>
          
          <div className="flex justify-between items-center w-full py-4 " >
          <h1>About Product</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4  h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
        {
          isOpen && <ShowAboutProduct productData={product}/>
        }
          
        </div>
        <CategoriesFooter/>
        <Footer/>
      </div>

      {/* for bigger screen */}
      <div className="xl:w-5/6 w-full sm:px-4 grid-cols-2 grid-rows-1 mx-auto hidden sm:grid sm:mb-5">
        {/* 1 */}

        {/* E:/what-to-do/project/backend/public/productImages/Product-Mango-Alphonso-(Hapus)-1712293199045.jpeg */}

        {/* parent container */}
        <div className=" w-full">
          <div className="flex justify-center items-center object-contain vs:border-none sm:border mt-5 mb-5">
            <img
              className="  mb-2 h-48 sm:h-96 vs:border-0 vs:border-none sm:rounded-md sm:border-none sm:border-skin-primary-void/10 sm:pb-16 sm:pt-12"
              alt={`${product?.name}`}
              src={`http://localhost:4000/productImages/${product?.image}`}
            />
          </div>

          <div className="w-full bg-white flex flex-col justify-center items-start">
            <h1 className="p-4 font-bold">About Product</h1>
            <div className="flex flex-col justify-center items-start text-gray-500 px-4">
              <ul className="list-disc list-outside">
                
              <li className="mb-1">
                <span className="">
                  Description : {product?.description}
                </span>
              </li>
              <li>
                <span className=" text-nowrap">
                  Shelf life : {product?.shelfLife}
                </span>
              </li>
              </ul>
            </div>
            
          </div>
        </div>

        {/* 2 */}
        {/* main div  */}
        <div className="w-full bg-white pl-10 pt-5">
          <div className=" pb-16 border-b-2 border-b-gray-200">
            <div className=" flex flex-col items-start justify-center">
              <span className="capitalize text-blue-700 bg-blue-200 px-2 rounded-sm mb-1">
                {product?.speciality}
              </span>
              <div className="flex justify-start items-start gap-5">
          
          <h1 className="text-xl font-medium mb-2">
            {product?.name}
          </h1>
          {!product?.isInStock &&
                    <span className="text-xs justify-self-center self-center h-1/2 flex justify-center items-center font-semibold border bg-red-100 text-red-700 rounded p-1 py-0 mb-1">
                    Out of Stock
                  </span>
          }
          </div>
              <h2 className="mb-3">{product?.unit}</h2>
            </div>

            <div className="grid grid-cols-3 justify-start items-center w-max text-center mb-4">
              <span className="text-2xl h-full flex justify-center items-center font-semibold">
                ₹{product?.priceAfterDiscount}
              </span>
              <span className="h-full flex justify-center items-center line-through">
                ₹{product?.price}
              </span>
              <span className="justify-self-center self-center text-xs h-1/2 flex justify-center items-center font-semibold border bg-blue-100 text-blue-700 rounded p-1 py-3">
                {product?.discount}% Off
              </span>
            </div>
            {/* ///////////////////////////////////////////////////////////////////////////////////////////////////   */}
            
            
            {!isINCart &&             <button onClick={(e)=>{e.preventDefault();handleAddToCart();}} className=" bg-slate-500 text-white flex justify-center items-center py-2 px-11 text-sm rounded-lg hover:bg-slate-500 hover:text-white hover:ring-2 hover:ring-slate-400 hover:ring-offset-1 hover:border hover:border-red-200">
              Add
            </button>}

            {/* {isINCart && <UpdateItemQuantityButton productId={product?._id} currentQuantityOfProduct={currentQuantityOfProduct} />} */}
            {isINCart && 
            <div className="w-24 bg-red-200 h-8">
            <UpdateItemQuantity2 productId={product?._id} currentQuantityOfProduct={currentQuantityOfProduct} 
            
            />
            </div>
            }
          </div>

          <HowItWorksSmallSize />
        </div>

        {/* how it works */}
      </div>
      <div className="hidden xl:w-5/6 sm:flex justify-center items-center mx-auto pt-5 pb-10  border-y-2 border-slate-300 sm:px-5">
        <CategoriesFooter />
      </div>
      <div className="xl:w-5/6 hidden sm:flex justify-center items-center mx-auto mt-10">
        <Footer />
      </div>
    </div>
    </div>
  );
}

function ShowProductImage(productData) {
  console.log(productData);
  return (
    <div className="flex justify-center items-center object-contain border mt-5 mb-5">
      <img
        className="  mb-2 h-48 sm:h-96 md:border-none sm:rounded-md sm:border sm:border-skin-primary-void/10 sm:pb-16 sm:pt-12"
        alt={`${productData?.productData?.name}`}
        src={`http://localhost:4000/productImages/${productData?.productData?.image}`}
      />
    </div>
  );
}

function ShowProductDetails(productData) {
  // console.log(productData.productData.isInStock);

  return (
    <div className=" pb-2 border-b-2 border-b-gray-200  w-full">
      <div className=" flex flex-col items-start justify-center">
        <span className="text-blue-700 bg-blue-200 text-sm sm:text-base px-2 rounded-sm mb-1">
          Ratnagiri
        </span>
        <div className="flex justify-start items-start gap-5">
          
        <h1 className="text-xl font-medium mb-2">
          {productData?.productData?.name}
        </h1>
        {!productData?.productData?.isInStock &&
                  <span className="text-xs justify-self-center self-center h-1/2 flex justify-center items-center font-semibold border bg-red-100 text-red-700 rounded p-1 py-0 mb-1">
                  Out of Stock
                </span>
        }
        </div>
        
        <h2 className="text-sm">{productData?.productData?.unit}</h2>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex justify-start items-center text-center gap-2">
          <span className="text-base h-full flex justify-center items-center font-bold">
            ₹{productData?.productData?.priceAfterDiscount}
          </span>
          <span className="text-sm h-full flex justify-center items-center line-through">
            ₹{productData?.productData?.price}
          </span>
          <span className="text-xs justify-self-center self-center h-1/2 flex justify-center items-center font-semibold border bg-blue-100 text-blue-700 rounded p-1 py-0">
            {productData?.productData?.discount}% Off
          </span>
        </div>
        <button className=" bg-slate-500 text-white flex justify-center items-center py-2 px-6 text-sm rounded-lg">
          Add
        </button>
      </div>
    </div>
  );
}

function ShowAboutProduct(productData) {
  return <div className="w-full bg-white flex flex-col justify-center items-start  pb-10">
  <div className="flex flex-col justify-center items-start text-gray-500 px-4 text-xs">
    <ul className="list-outside list-disc">
      
    <li className="mb-1">
      <span className="">
        Description : {productData?.productData?.description}
      </span>
    </li>
    <li className="">
      <span className="text-nowrap">
        Shelf life : {productData?.productData?.shelfLife}
      </span>
    </li>
    </ul>
  </div>
</div>
}

export default ProductOverviewPage;
