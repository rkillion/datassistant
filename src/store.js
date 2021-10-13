import { configureStore } from "@reduxjs/toolkit";
import userReducer from './features/auth/userSlice.js'

const store = configureStore({
    reducer: {
      user: userReducer
    },
  });
  
  export default store;