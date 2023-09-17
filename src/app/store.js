import { configureStore, createReducer } from '@reduxjs/toolkit';
import productReducer from '../features/productList/productSlice'
import authReducer from '../features/Auth/AuthSlice'
import cartReducer from '../features/Cart/CartSlice';
import orderReducer from '../features/order/orderSlice'
import UserReducer from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    product:productReducer ,
    auth:authReducer,
    cart:cartReducer,
    order:orderReducer,
    user:UserReducer,

  },
});
