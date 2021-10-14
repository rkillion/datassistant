import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    current: "base",
    status: "idle", // loading state
};

const displaySlice = createSlice({
    name: "display",
    initialState,
    reducers: {
        setDisplay(state, action) {
            state.current = action.payload;
        }
    }
})

export default displaySlice.reducer;

export const { setDisplay } = displaySlice.actions;
