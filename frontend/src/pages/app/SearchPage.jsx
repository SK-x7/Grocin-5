import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import UpdateItemQuantityButton from "../../components/cart/UpdateItemQuantity2";
import { addItem, getCurrentQuantityById, setIsSideCartOpen } from "../../features/cartSlice";
import { API_URL } from "../../utils/constants";
/* eslint react/prop-types: 0 */

function SearchPage() {
    
    const [searchResults,setSearchResults] = useState();
    const [isLoading,setIsLoading] = useState(false);
    console.log(searchResults);
    
    return (
        <div className="flex flex-col">
            <HeaderForSearch setSearchResults={setSearchResults} setIsLoading={setIsLoading}/>
            <ShowSearchProducts searchResults={searchResults} setSearchResults={setSearchResults} isLoading={isLoading} setIsLoading={setIsLoading}/>
        </div>
    )
}

function HeaderForSearch({setSearchResults,setIsLoading}){
    
    
    
    
    
    const [searchParams,setSearchParams]=useSearchParams();
    console.log(searchParams)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleToggleSideCart = () => {
        dispatch(setIsSideCartOpen());
      };
      
      let i=0;
      async function searchProducts() {
        i++;
        console.log(i,"ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥")
        const query=searchParams.get('q');
        const res=await axios.get(`${API_URL}/api/v1/product/searchProduct/search?q=${query}`);
        console.log(res?.data);
        
        if(res?.data?.status==="success"){
            let data=res?.data?.data?.uniqueResults;
            console.log(data)
            setSearchResults(data);
            setIsLoading(false);
        }
        
        
        
      }
      
      function handleChange(e){
        //   console.log(e.target.value,e.target.value.length);
        //   console.log(e.target.value);
          e.preventDefault();
        if(!e.target.value.length){
            console.log("x")
            searchParams.delete('q');
            setSearchParams(searchParams,{replace:true});
            setSearchResults([])
        }else{
            setIsLoading(true);
            searchParams.set('q',e.target.value)
            setSearchParams(searchParams,{replace:true});
            searchProducts();
        }
      }
      
      
    return        <header className="bg-sky-400 w-full h-16 min-h-16   grid grid-cols-10 grid-rows-1 justify-evenly items-center box-border sticky top-0 z-30 ">
    <div className="flex flex-1 justify-center items-center h-full cursor-pointer" onClick={(e)=>{
        e.preventDefault();
        navigate("/home")
    }}>
        <img alt="Logo img" src="/src/images/x.png" className="h-full w-full  object-contain object-center "/>
    </div>
    {/* 2 */}
    <div>                <button className="flex flex-1 justify-center items-center gap-1">
             <span>Add address</span>
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
</svg>


         </button></div>
    {/* 3 */}
    <div className=" col-span-6 flex justify-center items-center"><input onChange={handleChange} placeholder="Search for something" className="!h-2/3 w-11/12" value={searchParams.get('q')||""} autoFocus="true"/></div>
    {/* 4 */}
    <div className=" flex justify-center items-center h-full w-full" onClick={
        (e)=>{
            e.preventDefault();
            navigate("/account");
        }
    }>
        <button className="h-1/2"><svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-auto h-full">
<path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>
</button>
    </div>
    {/* 5 */}
    <div className=" flex justify-center items-center h-full w-full relative"> <button className="w-full h-1/2  flex justify-center items-center gap-1 
     " onClick={(e)=>{e.preventDefault();handleToggleSideCart() }}>
            
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-full w-auto">
<path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
</svg>
<span className="h-full align-middle text-center flex justify-center items-center">My Cart</span>

        </button></div>
</header>
}


function ShowSearchProducts({searchResults,setSearchResults,isLoading,setIsLoading}) {
    const [searchParams]=useSearchParams();
    async function searchProducts() {
        
        console.log("ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️🫥🫥🫥")
        const query=searchParams.get('q');
        const res=await axios.get(`${API_URL}/api/v1/product/searchProduct/search?q=${query}`);
        console.log(res?.data);
        
        if(res?.data?.status==="success"){
            let data=res?.data?.data?.uniqueResults;
            console.log(data)
            setSearchResults(data);
            setIsLoading(false);
        }
        
        
        
      }
      
      if(!searchResults)    searchProducts();
    // let isLoading = false;
    return           <main className=" !w-5/6 vs:!bg-red-200 flex flex-col justify-self-end !self-end">
    <div className=" pt-4 px-8 mb-8 flex items-center">
      
    <h1 className="text-2xl  font-semibold capitalize w-1/2 ">
        {searchParams.get("q")?`Showing results for '${searchParams.get('q')}'`:''}
    </h1>
    {/* ///  */}
    {/* ///  */}
    </div>

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
      <div className="w-full grid grid-cols-5 grid-rows-1 gap-3 px-3">
        {searchResults &&
          searchResults?.map((product) => (
            <ProductCard key={product?._id} product={product} />
))}

        {/* <div>2</div>
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
        <div>5</div> */}
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
}


function ProductCard({ product }) {
  
    const dispatch = useDispatch();
    const currentQuantityOfProduct = useSelector(
      getCurrentQuantityById(product?.id)
    );
    console.log(currentQuantityOfProduct,product,"ℹ️ℹ️ℹ️🫥🫥🫥🫥🫥⚠️⚠️🟡🟡🟡🟡🟡🫥🫥🫥🫥🫥⚠️⚠️🟡🟡🟡🟡🟡🫥🫥🫥🫥🫥⚠️⚠️🟡🟡🟡🟡🟡🫥🫥🫥🫥🫥⚠️⚠️🟡🟡🟡🟡🟡🫥🫥🫥🫥🫥⚠️⚠️🟡🟡🟡🟡🟡🫥🫥🫥🫥🫥⚠️⚠️🟡🟡🟡🟡🟡🫥🫥🫥🫥🫥⚠️⚠️🟡🟡🟡🟡🟡🫥🫥🫥🫥🫥⚠️⚠️🟡🟡🟡🟡🟡🫥🫥🫥🫥🫥⚠️⚠️🟡🟡🟡🟡🟡🫥🫥🫥🫥🫥⚠️⚠️🟡🟡🟡🟡🟡🫥🫥🫥🫥🫥⚠️⚠️🟡🟡🟡🟡🟡🫥🫥🫥🫥🫥⚠️⚠️🟡🟡🟡🟡🟡🫥🫥🫥🫥🫥⚠️⚠️🟡🟡🟡🟡🟡")
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
            className="h-64 relative flex flex-col justify-between w-full p-3 shadow-xl border rounded-md"
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
                // <UpdateItemQuantity2
                //   productId={product?._id}
                //   currentQuantityOfProduct={currentQuantityOfProduct}
                // />
              )}
              </div>
            </div>
          </div>
        ) : (
          <div
            key={product?.name}
            className="h-64 relative flex flex-col justify-between w-full p-3 shadow-xl border rounded-md"
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
  

export default SearchPage
