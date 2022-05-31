import {createSlice} from '@reduxjs/toolkit';

const orderSlice = createSlice({
<<<<<<< HEAD
    name: 'order',
    initialState: {list:[],index:0},
    reducers: {
      addProduct: (state, action) => {
        let check=true;
        let index=0;
        let temp={};
        state.list.forEach((e,i)=>{
          if(JSON.stringify(e.product) === JSON.stringify(action.payload.product)&&JSON.stringify(e.size) === JSON.stringify(action.payload.size)&&JSON.stringify(e.topping) === JSON.stringify(action.payload.topping)){
            check=false
            index=i
            temp={
              ...e,
              count:e.count+action.payload.count,
              total:e.total+action.payload.total,
            }
          }
        })
        if(check)
        {
          state.list.push({...action.payload,index:state.index})
          state.index+=1
        }
        else
        {
          state.list.splice(index,1,temp)
        }
      },
      removeProduct: (state, action) => {
        let index=0;
        state.list.forEach((e,i)=>{
          if(JSON.stringify(e.product) === JSON.stringify(action.payload.product)&&JSON.stringify(e.size) === JSON.stringify(action.payload.size)&&JSON.stringify(e.topping) === JSON.stringify(action.payload.topping)){
            index=i
          }
        })
        state.splice(index,1)
      },
      removeAllProduct:(state) => {
        state.list.splice(0,state.length)
      },
    },
  })
=======
  name: 'order',
  initialState: [],
  reducers: {
    addProduct: (state, action) => {
      let check = true;
      let index = 0;
      let temp = {};
      state.forEach((e, i) => {
        if (
          JSON.stringify(e.product) ===
            JSON.stringify(action.payload.product) &&
          JSON.stringify(e.size) === JSON.stringify(action.payload.size) &&
          JSON.stringify(e.topping) === JSON.stringify(action.payload.topping)
        ) {
          check = false;
          index = i;
          temp = {
            ...e,
            count: e.count + action.payload.count,
            total: e.total + action.payload.total,
          };
        }
      });
      if (check) state.push(action.payload);
      else state.splice(index, 1, temp);
    },
  },
});
>>>>>>> addPayment

export const {addProduct} = orderSlice.actions;

export default orderSlice.reducer;
