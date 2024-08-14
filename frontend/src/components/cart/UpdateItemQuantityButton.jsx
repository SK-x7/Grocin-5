/* eslint-disable react/prop-types */

import { useDispatch } from 'react-redux';
import { decreaseItemQuantity, increaseItemQuantity } from '././../../features/cartSlice';

function UpdateItemQuantityButton2({ productId, currentQuantityOfProduct }) {
  console.log(productId,'❌');
  const dispatch = useDispatch();

  return (
    <span className="flex items-center justify-center text-center text-lg gap-2 md:gap-3 bg-green-600 min-w-min  rounded-sm text-white border ring-1 ring-emerald-600 py-1 !h-7 !min-w-3 !text-[13px] !w-full xl:gap-3 xl:px-2">
      <button
        type="round"
        className='!h-full flex justify-center items-center'
        onClick={(e) =>{e.preventDefault(); dispatch(decreaseItemQuantity(productId))}}
        >
        -
      </button>
        
      <span disabled onClick={(e)=>e.preventDefault()}  className=" font-medium !h-full flex justify-center items-center">{currentQuantityOfProduct||0}</span>
      <button
      className='!h-full flex justify-center items-center'
        type="round"
        
        onClick={(e) => {e.preventDefault();dispatch(increaseItemQuantity(productId))}}
      >
        +
      </button>
    </span>
  );
}

export default UpdateItemQuantityButton2;
