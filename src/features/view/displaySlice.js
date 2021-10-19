import { createSlice } from "@reduxjs/toolkit";

export const assistantPathObject = {
    id: "assistant",
    title_singular: "Assistant",
    title_plural: "Assistant"
}

export const myDataPathObject = {
    id: "myData",
    title_singular: "My Data",
    title_plural: "My Data"
}

const initialState = {
    current: "base",
    path: [
        {...assistantPathObject},
        {...myDataPathObject}
    ],
    status: "idle", // loading state
};

const displaySlice = createSlice({
    name: "display",
    initialState,
    reducers: {
        setDisplay(state, action) {
            state.current = action.payload;
        },
        setDisplayPath(state, action) {
            state.path = action.payload;
        }
    }
})

export default displaySlice.reducer;

export const { setDisplay, setDisplayPath } = displaySlice.actions;
