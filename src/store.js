import { configureStore } from "@reduxjs/toolkit";
import commandsReducer from "./features/action/commandsSlice.js";
import userReducer from './features/auth/userSlice.js'
import datassistantsReducer from "./features/datassistant/datassistantsSlice.js";
import typesReducer from "./features/type/typesSlice.js";
import displayReducer from "./features/view/displaySlice.js";

const store = configureStore({
    reducer: {
      commands: commandsReducer,
      datassistants: datassistantsReducer,
      display: displayReducer,
      types: typesReducer,
      user: userReducer
    },
  });
  
  export default store;