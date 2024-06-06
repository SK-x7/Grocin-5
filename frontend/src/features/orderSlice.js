import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentOrderId:null,

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

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setCurrentOrderId(state, action) {
      state.currentOrderId = action.payload;
    },
    clearCurrentOrderId(state) {
      state.currentOrderId = null;
    },
  },
});

export const {
  setCurrentOrderId,clearCurrentOrderId
} = orderSlice.actions;

export default orderSlice.reducer;



// 'reselect'
