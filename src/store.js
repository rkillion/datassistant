import { configureStore } from "@reduxjs/toolkit";
import userReducer from './features/auth/userSlice.js'
import datassistantsReducer from "./features/datassistant/datassistantsSlice.js";

const store = configureStore({
    reducer: {
      datassistants: datassistantsReducer,
      user: userReducer
    },
  });
  
  export default store;