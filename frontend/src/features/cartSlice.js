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

      item.quantity--;
      item.totalPrice = item?.quantity * item?.productPrice;
      state.grandTotal-=item?.productPrice;
      item.totalPriceAfterDiscount = item?.quantity * item?.productPriceAfterDiscount;
      state.grandTotalAfterDiscount-=item?.productPriceAfterDiscount;
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
      }
    
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
  setIsSideCartOpen
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
