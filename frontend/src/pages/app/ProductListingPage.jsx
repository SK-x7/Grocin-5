/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
// import { useEffect, useLayoutEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// import { Link } from "react-router-dom";
import { getCategory } from "../../apis/categoryApi";
import { getSubCategory } from "../../apis/subCategoryApi";
import Header from "../../components/ui/Header";
import { useSelector, useDispatch } from "react-redux";
import {
  addItem,
  getCart,
  getCurrentQuantityById,
} from "../../features/cartSlice";
import UpdateItemQuantityButton from "../../components/cart/UpdateItemQuantityButton";
import { useRef } from "react";


function ProductListingPage() {
  
  //
  const cart = useSelector(getCart);
  const isSideCartOpen = useSelector((state) => state.cart.isSideCartOpen);
  let ref = useRef();
  let [height, setHeight] = useState(null);
  useEffect(() => {
    if (isSideCartOpen) {
      console.log(
        ref.current.offsetHeight,
        "⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕"
      );
      setHeight(ref.current.offsetHeight);
    }
  }, [isSideCartOpen]);
  // useLayoutEffect(() => {
  //   console.log(ref.current.offsetHeight,"⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕");
  //   setHeight(ref.current.offsetHeight)}, []);

  // const dispatch = useDispatch();
  console.log(cart);
  const { categoryId, subcategoryId } = useParams();
  // let subcategoryId=searchParams.get("subcategoryId")
  const [selectedSubCategory, setSelectedSubCategory] = useState(subcategoryId);
  let category;

  const {
    data: products,
    isSuccess: isProductFetchingSuccesful,
    isLoading,
    isFetching: isFetchingProducts,
    refetch,
  } = useQuery(
    ["getSubCategory", selectedSubCategory],
    () => getSubCategory(selectedSubCategory)

    // The query will not execute until the userId exists
    // enabled: !!activeSUbCategory,
  );

  // useEffect(() => {
  //   setActiveSubCategory(category?.subcategories[0])
  //   setSelectedSubCategory(category?.subcategories[0]?._id);
  //   console.log(selectedSubCategory,"❌❌❌❌❌");
  //   return () => {
  //     setActiveSubCategory(false);
  //     setSelectedSubCategory(null);
  //     refetch();
  //   }
  // }, [category?.subcategories,refetch,selectedSubCategory])

  // let categoryId="65e75f863b43f78969f6d826"
  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ["getACategory", categoryId],
    queryFn: () => getCategory(categoryId),
  });

  console.log(isFetching, isSuccess);
  console.log(data, "😀");
  if (isFetching === false && isSuccess == true) {
    category = data?.data?.data?.category;
  }

  const [activeList, setActiveList] = useState(false);
  const [activeSUbCategory, setActiveSubCategory] = useState(
    category?.subcategories[0] || ""
  );
  console.log(setActiveList);

  // const { data: products,isSuccess:isProductFetchingSuccesful,isLoading,isFetching:isFetchingProducts,refetch } = useQuery({

  //   queryKey: ["getSubCategory"],
  //   queryFn: () => getSubCategory(selectedSubCategory),
  //   enabled:false
  //   // The query will not execute until the userId exists
  //   // enabled: !!activeSUbCategory,

  // });
  console.log(isFetchingProducts, isProductFetchingSuccesful);
  console.log(products, "😆");

  console.log(category, "🧨");
  return (
    <div className="w-full h-min min-h-min">
      {isSideCartOpen && (
        <div
          className={`!z-40 w-full !absolute !top-0 !bottom-0 !left-0 !bg-black/75 !h-[${height}px]  !min-h-screen`}
        ></div>
      )}
      <div className={`w-full `} ref={ref}>
        <Header />
        {/* Product and category page */}
        {/* <div className="w-full flex"> */}

        <div className={`!w-full !flex !flex-col`}>
          <nav className=" w-1/6 !fixed top-16 bg-red-300 !h-full !min-h-full !z-10" >
            <div className="overflow-auto !h-full !w-full">
              {/* <div className="!visible"> */}
              <SubCategoryNav
                category={category}
                setActiveList={setActiveList}
                setActiveSubCategory={setActiveSubCategory}
                selectedSubCategory={selectedSubCategory}
                activeList={activeList}
                refetch={refetch}
                setSelectedSubCategory={setSelectedSubCategory}
              />
            </div>
          </nav>

          {/* //NOTE - main right section */}

          <main className=" !w-5/6 vs:!bg-red-200 flex flex-col justify-self-end !self-end">
            <h1 className="text-2xl pt-4 px-8 mb-8 font-semibold capitalize">
              Buy {activeSUbCategory?.name} Online
            </h1>

            {isLoading ? (
              <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white mx-auto"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
            ) : (
              <div className="w-full grid grid-cols-5 grid-rows-1 ">
                {products &&
                  products.map((product) => (
                    <ProductCard key={product?._id} product={product} />
                    // <Link
                    //   to={`/pn/${product?.name}/pvid/${product?._id}`
                    //     .replace(/[^\w/]+/g, "-")
                    //     .replace(/-\//g, "/")
                    //     .toLowerCase()}
                    //   key={product?._id}
                    // >
                    //   {product?.isInStock ? (
                    //     <div
                    //       key={product?.name}
                    //       className="h-64 relative flex flex-col justify-between w-full p-3 shadow-xl border"
                    //     >
                    //       {product?.discount && (
                    //         <span className="absolute top-0 left-0 justify-self-center self-center text-[10px] flex justify-center items-center font-semibold border bg-fuchsia-500 text-white rounded-br-2xl pr-2 px-1 py-[2px]">
                    //           {product?.discount} % Off
                    //         </span>
                    //       )}

                    //       <div className="w-full h-1/2 flex object-cover justify-center">
                    //         <img
                    //           className=""
                    //           src={`http://localhost:4000/productImages/${product?.image}`}
                    //         />
                    //         {/* <img className="" src="https://www.pixelstalk.net/wp-content/uploads/2016/07/Free-Amazing-Background-Images-Nature.jpg"/> */}

                    //         {product?.speciality && (
                    //           <span className="absolute bottom-1/2 sm:left-0 lg:left-1 justify-self-center self-center text-[10px] flex justify-center items-center font-semibold border bg-blue-100 text-blue-700 rounded-sm pr-2 px-1 py-[1px] text-center">
                    //             {product?.speciality}
                    //           </span>
                    //         )}
                    //       </div>

                    //       <div className="w-full ">
                    //         <h4 className="lg:!text-sm capitalize line-clamp-2 sm:!text-base mb-2 font-medium">
                    //           {product?.name}
                    //         </h4>
                    //         <h4 className="line-clamp-1 text-sm text-gray-500">
                    //           {product?.unit}
                    //         </h4>
                    //       </div>

                    //       <div className="flex justify-between items-center">
                    //         <div className="flex flex-col justify-start items-center text-center">
                    //           <span className="text-xs h-full flex justify-center items-center line-through">
                    //             ₹ {product?.price}
                    //           </span>
                    //           <span className="text-sm h-full flex justify-center items-center font-bold">
                    //             ₹ {product?.priceAfterDiscount}
                    //           </span>
                    //         </div>
                    //         <button
                    //           onClick={(e) => {
                    //             e.preventDefault();
                    //             const newItem = {
                    //               productId: product?._id,
                    //               productName: product?.name,
                    //               quantity: 1,
                    //               productPrice: product?.priceAfterDiscount,
                    //               totalPrice: product?.priceAfterDiscount * 1,
                    //             };
                    //             console.log(newItem, "🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔");
                    //             dispatch(addItem(newItem));
                    //           }}
                    //           className=" bg-white text-red-500 ring-1 ring-red-300 flex justify-center items-center py-1  px-3 text-sm rounded-lg"
                    //         >
                    //           Add
                    //         </button>

                    //       </div>
                    //     </div>
                    //   ) : (
                    //     <div
                    //       key={product?.name}
                    //       className="h-64 relative flex flex-col justify-between w-full p-3 shadow-xl border "
                    //     >
                    //       {product?.discount && (
                    //         <span className="absolute top-0 left-0 justify-self-center self-center text-[10px] flex justify-center items-center font-semibold border bg-fuchsia-500 text-white rounded-br-2xl pr-2 px-1 py-[2px] z-10">
                    //           {product?.discount} % Off
                    //         </span>
                    //       )}
                    //       <span className="absolute top-1/4 bottom-3/4 mx-auto justify-self-center self-center text-sm flex justify-center items-center font-bold border bg-white ring-1 ring-red-400 text-red-500 rounded-md  px-2 py-1 z-10 -rotate-[10deg]">
                    //         Out of Stock ‼️
                    //       </span>

                    //       <div className="w-full h-1/2 flex object-cover justify-center">
                    //         <img
                    //           className="opacity-20"
                    //           src={`http://localhost:4000/productImages/${product?.image}`}
                    //         />
                    //         {product?.speciality && (
                    //           <span className="absolute bottom-1/2 sm:left-0 lg:left-1 justify-self-center self-center text-[10px] flex justify-center items-center font-semibold border bg-blue-100 text-blue-700 rounded-sm pr-2 px-1 py-[1px] text-center z-20">
                    //             {product?.speciality}
                    //           </span>
                    //         )}
                    //       </div>

                    //       <div className="w-full opacity-40">
                    //         <h4 className="lg:!text-sm capitalize line-clamp-2 sm:!text-base mb-2 font-medium">
                    //           {product?.name}
                    //         </h4>
                    //         <h4 className="line-clamp-1 text-sm text-gray-500">
                    //           {product?.unit}
                    //         </h4>
                    //       </div>

                    //       <div className="flex justify-between items-center">
                    //         <div className="flex flex-col justify-start items-center text-center opacity-30">
                    //           <span className="text-xs h-full flex justify-center items-center line-through">
                    //             ₹ {product?.price}
                    //           </span>
                    //           <span className="text-sm h-full flex justify-center items-center font-bold">
                    //             ₹ {product?.priceAfterDiscount}
                    //           </span>
                    //         </div>
                    //         <button className=" bg-white text-red-500 ring-1 ring-red-300 flex justify-center items-center py-1  px-3 text-sm rounded-lg opacity-95">
                    //           🔔 Notify
                    //         </button>
                    //       </div>
                    //     </div>
                    //   )}
                    // </Link>
                  ))}
                {/* <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white mx-auto"
            role="status">
            <span
              className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
              >Loading...</span
            >
          </div> */}

                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
              </div>
            )}

            {/* clear */}

            {/* <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white mx-auto"
            role="status">
            <span
              className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
              >Loading...</span
            >
          </div> */}

            {/* clear  */}
          </main>
        </div>
      </div>
    </div>
  );
}

export default ProductListingPage;

function SubCategoryNav({
  category,
  activeList,
  setActiveList,
  setSelectedSubCategory,
  setActiveSubCategory,
  selectedSubCategory,
  refetch,
}) {
  const navigate = useNavigate();
  const { subcategoryId } = useParams();

  return (
    <>
      {category?.subcategories?.map((subcategory) => (
        <li
          onClick={(e) => {
            e.preventDefault();
            // setActiveSubCategory(false);
            setActiveList(true);
            setActiveSubCategory(subcategory);
            setSelectedSubCategory(subcategory._id);
            // let url =`/cn/${category?.name}/${category?.subcategories?.[0]?.name}/cid/${category?._id}/scid/${category?.subcategories?.[0]?._id}`.replace(/\s+/g, '-').replace(/\s+|and/gi, '-').replace(/\s+|and|&|,/gi, '-').replace(/-+/g, '-').toLowerCase()
            let url =
              `/cn/${category?.name}/${subcategory?.name}/cid/${category?._id}/scid/${subcategory?._id}`
                .replace(/\s+/g, "-")
                .replace(/\s+|and/gi, "-")
                .replace(/\s+|and|&|,/gi, "-")
                .replace(/-+/g, "-")
                .toLowerCase();
            console.log(url, "👿👿👿👿👿👿👿👿");
            navigate(url);
            console.log(selectedSubCategory, "❌");
            console.log(activeList);

            refetch();
            // setActiveSubCategory(undefined);
          }}
          onMouseEnter={(e) => {
            e.preventDefault();
            setActiveList(true);
          }}
          onMouseLeave={(e) => {
            e.preventDefault();
            setActiveList(false);
          }}
          className={
            subcategory?._id === subcategoryId
              ? " list-none w-full px-2 lg:!px-4 lg:py-2 bg-blue-100 hover:bg-blue-100 hover:border-l-4 hover:border-blue-500"
              : "list-none w-full px-2 lg:!px-4 lg:py-2 hover:bg-blue-100 bg-white border-none"
          }
          key={subcategory?.name}
        >
          <div className="w-full h-16 flex sm:justify-center lg:justify-start items-center gap-3">
            <div
              className={
                // activeList
                // (subcategory?._id===subcategoryId)
                activeList
                  ? // ? "lg:!w-12 lg:!h-12 !w-9 !h-9 !bg-white flex justify-center items-center rounded-full hover:!bg-white"
                    "lg:!w-12 lg:!h-12 !w-9 !h-9 !bg-white flex justify-center items-center rounded-full hover:!bg-white"
                  : "lg:!w-12 lg:!h-12 !w-9 !h-9 !bg-blue-100 flex justify-center items-center rounded-full hover:!bg-white"
              }
            >
              {/* // <div {activeList?} className="lg:!w-12 lg:!h-12 !w-9 !h-9 bg-blue-100 flex justify-center items-center */}
              {/* // rounded-full "> */}
              <img
                src={`http://localhost:4000/subCategoryImages/${subcategory?.image}`}
                className="!object-contain !h-5/6 !w-5/6  !rounded-full"
              />
              {/* <img src="https://cdn3.iconfinder.com/data/icons/avatars-flat/33/man_5-1024.png" className="object-contain !h-full !w-full border !rounded-full"/> */}
            </div>
            <span className="!w-1/2 text-xs lg:!text-sm font-medium line-clamp-2 overflow-hidden text-left">
              {subcategory?.name}
            </span>
          </div>
        </li>
      ))}
    </>
  );
}

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const currentQuantityOfProduct = useSelector(
    getCurrentQuantityById(product?.id)
  );
  console.log(currentQuantityOfProduct);
  const isINCart = currentQuantityOfProduct > 0;
  console.log(isINCart);
  function handleAddToCart() {
    const newItem = {
      productId: product?._id,
      productName: product?.name,
      quantity: 1,
      productPrice: product?.price,
      productPriceAfterDiscount: product?.priceAfterDiscount,
      totalPrice: product?.price * 1,
      totalPriceAfterDiscount: product?.priceAfterDiscount * 1,
      productImageUrl:product?.image,
      unit:product?.unit
    };
    console.log(newItem, "🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔");
    dispatch(addItem(newItem));
  }
  return (
    <Link
      to={`/pn/${product?.name}/pvid/${product?._id}`
        .replace(/[^\w/]+/g, "-")
        .replace(/-\//g, "/")
        .toLowerCase()}
      key={product?._id}
    >
      {product?.isInStock ? (
        <div
          key={product?.name}
          className="h-64 relative flex flex-col justify-between w-full p-3 shadow-xl border"
        >
          {(product?.discount && ((product?.discount) > 0)) ? 
            <span className=" absolute top-0 left-0 justify-self-center self-center text-[10px] flex justify-center items-center font-semibold border bg-fuchsia-500 text-white rounded-br-2xl pr-2 px-1 py-[2px]">
              {product?.discount} % Off
            </span>
          :""}

          <div className="w-full h-1/2 flex object-cover justify-center">
            <img
              className=""
              src={`http://localhost:4000/productImages/${product?.image}`}
            />
            {/* <img className="" src="https://www.pixelstalk.net/wp-content/uploads/2016/07/Free-Amazing-Background-Images-Nature.jpg"/> */}

            {product?.speciality && (
              <span className="absolute bottom-1/2 sm:left-0 lg:left-1 justify-self-center self-center text-[10px] flex justify-center items-center font-semibold border bg-blue-100 text-blue-700 rounded-sm pr-2 px-1 py-[1px] text-center">
                {product?.speciality}
              </span>
            )}
          </div>

          <div className="w-full ">
            <h4 className="lg:!text-sm capitalize line-clamp-2 sm:!text-base mb-2 font-medium">
              {product?.name}
            </h4>
            <h4 className="line-clamp-1 text-sm text-gray-500">
              {product?.unit}
            </h4>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex flex-col justify-start items-center text-center">
              {product?.priceAfterDiscount !== product?.price && (
                <span className="text-xs h-full flex justify-center items-center line-through">
                  ₹ {product?.price}
                </span>
              )}
              <span className="text-sm h-full flex justify-center items-center font-bold">
                ₹ {product?.priceAfterDiscount}
              </span>
            </div>

            <div className="w-1/3 flex justify-end mr-2">
            {!isINCart && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleAddToCart();
                }}
                className=" bg-white text-red-500 ring-1 ring-red-300 flex justify-center items-center py-1  px-3 text-sm rounded-lg"
              >
                Add
              </button>
            )}
            
              
            {isINCart && (
              <UpdateItemQuantityButton
                productId={product?._id}
                currentQuantityOfProduct={currentQuantityOfProduct}
              />
            )}
            </div>
          </div>
        </div>
      ) : (
        <div
          key={product?.name}
          className="h-64 relative flex flex-col justify-between w-full p-3 shadow-xl border "
        >
          {(product?.discount && ((product?.discount) > 0)) ?
            <span className=" absolute top-0 left-0 justify-self-center self-center text-[10px] flex justify-center items-center font-semibold border bg-fuchsia-500 text-white rounded-br-2xl pr-2 px-1 py-[2px] z-10">
              {product?.discount} % Off
            </span>:""
          }
          <span className="absolute top-1/4 bottom-3/4 mx-auto justify-self-center self-center text-sm flex justify-center items-center font-bold border bg-white ring-1 ring-red-400 text-red-500 rounded-md  px-2 py-1 z-10 -rotate-[10deg]">
            Out of Stock ‼️
          </span>

          <div className="w-full h-1/2 flex object-cover justify-center">
            <img
              className="opacity-20"
              src={`http://localhost:4000/productImages/${product?.image}`}
            />
            {product?.speciality && (
              <span className="absolute bottom-1/2 sm:left-0 lg:left-1 justify-self-center self-center text-[10px] flex justify-center items-center font-semibold border bg-blue-100 text-blue-700 rounded-sm pr-2 px-1 py-[1px] text-center z-20">
                {product?.speciality}
              </span>
            )}
          </div>

          <div className="w-full opacity-40">
            <h4 className="lg:!text-sm capitalize line-clamp-2 sm:!text-base mb-2 font-medium">
              {product?.name}
            </h4>
            <h4 className="line-clamp-1 text-sm text-gray-500">
              {product?.unit}
            </h4>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex flex-col justify-start items-center text-center opacity-30">
            {product?.priceAfterDiscount !== product?.price && (
                <span className="text-xs h-full flex justify-center items-center line-through">
                  ₹ {product?.price}
                </span>
              )}
              <span className="text-sm h-full flex justify-center items-center font-bold">
                ₹ {product?.priceAfterDiscount}
              </span>
            </div>
            <button className=" bg-white text-red-500 ring-1 ring-red-300 flex justify-center items-center py-1  px-3 text-sm rounded-lg opacity-95">
              🔔 Notify
            </button>
          </div>
        </div>
      )}
    </Link>
  );
}

// STUB - product card

{
  /* <div className="h-64 relative flex flex-col justify-between w-full p-3 shadow-xl border">
  <span className="absolute top-0 left-0 justify-self-center self-center text-[10px] flex justify-center items-center font-semibold border bg-fuchsia-500 text-white rounded-br-2xl pr-2 px-1 py-[2px]">
    5 % Off
  </span>

  <div className="w-full h-1/2 flex object-cover justify-center">
    <img
      className=""
      src="https://www.pixelstalk.net/wp-content/uploads/2016/07/Free-Amazing-Background-Images-Nature.jpg"
    />
    <span className="absolute bottom-1/2 sm:left-0 lg:left-1 justify-self-center self-center text-[10px] flex justify-center items-center font-semibold border bg-blue-100 text-blue-700 rounded-sm pr-2 px-1 py-[1px] text-center">
      For Blood Sugar
    </span>
  </div>

  <div className="w-full ">
    <h4 className="lg:!text-sm capitalize line-clamp-2 sm:!text-base mb-2 font-medium">
      pluckk fruit chaat
    </h4>
    <h4 className="line-clamp-1 text-sm text-gray-500">250 g</h4>
  </div>

  <div className="flex justify-between items-center">
    <div className="flex flex-col justify-start items-center text-center">
      <span className="text-xs h-full flex justify-center items-center line-through">
        ₹ 120
      </span>
      <span className="text-sm h-full flex justify-center items-center font-bold">
        ₹ 96
      </span>
    </div>
    <button className=" bg-white text-red-500 ring-1 ring-red-300 flex justify-center items-center py-1  px-3 text-sm rounded-lg">
      Add
    </button>
  </div>
</div>;

{
  /* test  for out of stock products*/
}
{
  /* <div className="h-64 relative flex flex-col justify-between w-full p-3 shadow-xl border ">
  <span className="absolute top-0 left-0 justify-self-center self-center text-[10px] flex justify-center items-center font-semibold border bg-fuchsia-500 text-white rounded-br-2xl pr-2 px-1 py-[2px] z-10">
    5 % Off
  </span>
  <span className="absolute top-1/4 bottom-3/4 mx-auto justify-self-center self-center text-sm flex justify-center items-center font-bold border bg-white ring-1 ring-red-400 text-red-500 rounded-md  px-2 py-1 z-10 -rotate-[10deg]">
    Out of Stock ‼️
  </span>

  <div className="w-full h-1/2 flex object-cover justify-center">
    <img
      className="opacity-20"
      src="https://www.pixelstalk.net/wp-content/uploads/2016/07/Free-Amazing-Background-Images-Nature.jpg"
    />
    <span className="absolute bottom-1/2 sm:left-0 lg:left-1 justify-self-center self-center text-[10px] flex justify-center items-center font-semibold border bg-blue-100 text-blue-700 rounded-sm pr-2 px-1 py-[1px] text-center z-20">
      For Blood Sugar
    </span>
  </div>

  <div className="w-full opacity-40">
    <h4 className="lg:!text-sm capitalize line-clamp-2 sm:!text-base mb-2 font-medium">
      pluckk fruit chaat
    </h4>
    <h4 className="line-clamp-1 text-sm text-gray-500">250 g</h4>
  </div>

  <div className="flex justify-between items-center">
    <div className="flex flex-col justify-start items-center text-center opacity-30">
      <span className="text-xs h-full flex justify-center items-center line-through">
        ₹ 120
      </span>
      <span className="text-sm h-full flex justify-center items-center font-bold">
        ₹ 96
      </span>
    </div>
    <button className=" bg-white text-red-500 ring-1 ring-red-300 flex justify-center items-center py-1  px-3 text-sm rounded-lg opacity-95">
      🔔 Notify
    </button>
  </div>
</div>;  */
}
{
  /* test  */
}
