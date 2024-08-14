import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
  isSideCartOpen: false,
  grandTotal:0,
  grandTotalAfterDiscount:0,

  // cart: [
  //   {
  //     pizzaId: 12,
  //     name: 'Mediterranean',
  //     quantity: 2,
  //     unitPrice: 16,
  //     totalPrice: 32,
  //   },
  // ],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      // payload = newItem
      console.log(action.payload,"uiuqyufwuufgf kghhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh🤬🤬")
      state.cart.push(action.payload);
      state.grandTotal+=action.payload?.productPrice;
      state.grandTotalAfterDiscount+=action.payload?.productPriceAfterDiscount;
      // console.log(item,"╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯");
    },
    deleteItem(state, action) {
      state.cart = state?.cart?.filter((item) => item?.productId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      // payload = pizzaId
      const item = state?.cart?.find((item) => item?.productId === action.payload);

      item.quantity++;
      item.totalPrice = item?.quantity * item?.productPrice;
      state.grandTotal+=item?.productPrice;
      item.totalPriceAfterDiscount = item?.quantity * item?.productPriceAfterDiscount;
      state.grandTotalAfterDiscount+=item?.productPriceAfterDiscount;
    },
    decreaseItemQuantity(state, action) {
      // payload = pizzaId
      const item = state?.cart?.find((item) => item?.productId === action.payload);
      // console.log(item.quantity,"🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️")
      item.quantity--;
      console.log(item.totalPrice,"🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️")
      item.totalPrice = item?.quantity * item?.productPrice;
      state.grandTotal-=item?.productPrice;
      if(state?.grandTotal<0) state.grandTotal=0;
      item.totalPriceAfterDiscount = item?.quantity * item?.productPriceAfterDiscount;
      state.grandTotalAfterDiscount-=item?.productPriceAfterDiscount;
      if(state?.grandTotalAfterDiscount<0) state.grandTotalAfterDiscount=0;
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      state.cart = [];
      state.isSideCartOpen= false;
      state.grandTotal=0;
      state.grandTotalAfterDiscount=0;
    },
    setIsSideCartOpen(state){
      // const isopen=state.isSideCartOpen;
      // console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
      // console.log(isopen);
      // console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
      state.isSideCartOpen=!(state?.isSideCartOpen);
      },
    
      //logic for handeling the "Re-order" functionality
      
      //SECTION
      
      increaseItemQuantityByValue(state,action){ 
        
        // 1--check if it is already present in cart or not
        const item = state?.cart?.find((item) => item?.productId === action.payload?.productData?.id);
        
        // 2--if item is already present in cart
        if(item&&(item!==undefined)){
          item.quantity+=action.payload?.productQuantity;
          item.totalPrice = item?.quantity * item?.productPrice;
          state.grandTotal+=item?.productPrice;
          item.totalPriceAfterDiscount = item?.quantity * item?.productPriceAfterDiscount;
          state.grandTotalAfterDiscount+=item?.productPriceAfterDiscount;
        }else{
          const newItem={
            productId: action.payload?.productData?.id,
            productName: action.payload?.productData?.name,
            productImageUrl: action.payload?.productData?.image,
            productPrice: action.payload?.productData?.price,
            productPriceAfterDiscount: action.payload?.productData?.priceAfterDiscount,
            quantity: action.payload?.productQuantity,
            totalPrice: action.payload?.productData?.price*(action.payload?.productQuantity),
            totalPriceAfterDiscount: action.payload?.productData?.priceAfterDiscount*(action.payload?.productQuantity),
            unit: action.payload?.productData?.unit,
          }
          
          console.log(newItem)
          
          state.cart.push(newItem);
          state.grandTotal+=newItem?.totalPrice;
          state.grandTotalAfterDiscount+=newItem?.totalPriceAfterDiscount;
        }
        
      }
      ,
      
      decreaseItemQuantityByValue(state, action) {
        // payload = pizzaId
        const item = state?.cart?.find((item) => item?.productId === action.payload?.productData?.id);
        item.quantity-=action.payload?.productQuantity;
        
  
        item.totalPrice = item?.quantity * item?.productPrice;
        state.grandTotal-=(item?.productPrice)*action.payload?.productQuantity;
        if(state?.grandTotal<0) state.grandTotal=0;
        
        item.totalPriceAfterDiscount = item?.quantity * item?.productPriceAfterDiscount;
        state.grandTotalAfterDiscount-=item?.productPriceAfterDiscount*action.payload?.productQuantity;
        if(state?.grandTotalAfterDiscount<0) state.grandTotalAfterDiscount=0;
        if (item.quantity === 0) state.cart = state?.cart?.filter((item) => item?.productId !== action.payload?.productData?.id);
        // item.quantity+=action.payload?.productQuantity;
        // item.totalPrice = item?.quantity * item?.productPrice;
        // state.grandTotal+=item?.productPrice;
        // item.totalPriceAfterDiscount = item?.quantity * item?.productPriceAfterDiscount;
        // state.grandTotalAfterDiscount+=item?.productPriceAfterDiscount;
      },
      
      
      //!SECTION
      
      
      
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
  setIsSideCartOpen,
  increaseItemQuantityByValue,
  decreaseItemQuantityByValue
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (state) => state?.cart?.cart;

export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item?.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item?.totalPrice, 0);

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item?.productId === id)?.quantity ?? 0;

// 'reselect'
