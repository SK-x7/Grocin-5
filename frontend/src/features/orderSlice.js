import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentOrderId:null,
  idOfReOrders:[],

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
    addToReOrders(state,action){
      state.idOfReOrders.push(action.payload);
    },        
    removeFromReOrders(state,action){
      const index = state.idOfReOrders.indexOf(action.payload);
      if (index !== -1) {
        state.idOfReOrders.splice(index, 1);
      } 
    },
    clearIdOfReOrders(state){
      state.idOfReOrders=[];
    }

    
  },
});

export const {
  setCurrentOrderId,clearCurrentOrderId,
  addToReOrders,removeFromReOrders,clearIdOfReOrders
} = orderSlice.actions;



export default orderSlice.reducer;



// 'reselect'
