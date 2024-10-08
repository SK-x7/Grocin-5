/* eslint-disable react/prop-types */

import { useDispatch } from 'react-redux';
import { decreaseItemQuantity, increaseItemQuantity } from '././../../features/cartSlice';

function UpdateItemQuantityButton({ productId, currentQuantityOfProduct }) {
  console.log(productId,'❌');
  const dispatch = useDispatch();

  return (
    <span className="flex items-center justify-center text-center text-lg gap-2 md:gap-3 bg-green-600 min-w-min  rounded-sm text-white border ring-1 ring-emerald-600 py-1  !min-w-3 !text-[13px] !w-full xl:gap-3 xl:px-2 !h-full">
      <button
        type="round"
        className='!h-full flex justify-center items-center text-base'
        onClick={(e) =>{e.preventDefault(); dispatch(decreaseItemQuantity(productId))}}
        >
        -
      </button>
        
      <span disabled onClick={(e)=>e.preventDefault()}  className=" font-medium !h-full flex justify-center items-center text-base">{currentQuantityOfProduct||0}</span>
      <button
      className='!h-full flex justify-center items-center text-base'
        type="round"
        
        onClick={(e) => {e.preventDefault();dispatch(increaseItemQuantity(productId))}}
      >
        +
      </button>
    </span>
  );
}

export default UpdateItemQuantityButton;
