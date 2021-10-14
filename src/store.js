import { configureStore } from "@reduxjs/toolkit";
import userReducer from './features/auth/userSlice.js'
import datassistantsReducer from "./features/datassistant/datassistantsSlice.js";
import typesReducer from "./features/type/typesSlice.js";
import displayReducer from "./features/view/displaySlice.js";

const store = configureStore({
    reducer: {
      datassistants: datassistantsReducer,
      display: displayReducer,
      types: typesReducer,
      user: userReducer
    },
  });
  
  export default store;