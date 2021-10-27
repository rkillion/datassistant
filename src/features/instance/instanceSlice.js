import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchInstance = createAsyncThunk("instances/fetchInstance", (id) => {
    return fetch(`/instances/${id}`)
        .then((response) => response.json())
        .then((data) => data);
});

const initialState = {
    current: {},
    errors: {},
    allFetched: [],
    status: "idle"
}

const instancesSlice = createSlice({
    name: "instances",
    initialState,
    reducers: {

    },
    extraReducers: {
        [fetchInstance.pending](state) {
            state.status = "loading";
          },
        [fetchInstance.rejected](state) {
            state.status = "idle";
        },
        [fetchInstance.fulfilled](state, action) {
            if (action.payload.errors) {
                state.errors = action.payload
            } else {
                state.current = action.payload;
                state.allFetched.push(action.payload);
            }
            state.status = "idle";
        }
    }
})

export default instancesSlice.reducer;