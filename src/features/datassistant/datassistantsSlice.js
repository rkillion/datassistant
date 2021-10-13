import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchDatassistants = createAsyncThunk("datassistants/fetchDatassistants", () => {
    return fetch('/datassistants')
        .then((response) => response.json())
        .then((data) => data);
    });

export const postDatassistant = createAsyncThunk("datassistants/postDatassistant", (datassistant) => {
    return fetch('/datassistants', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datassistant)
    })
        .then((response) => response.json())
        .then((data) => data);
    });

const initialState = {
    all: [],
    errors: {},
    status: "idle", // loading state
};

const datassistantsSlice = createSlice({
    name: "datassistants",
    initialState,
    reducers: {

    },
    extraReducers: {
        [fetchDatassistants.pending](state) {
            state.status = "loading";
          },
        [fetchDatassistants.rejected](state) {
            state.status = "idle";
        },
        [fetchDatassistants.fulfilled](state, action) {
            if (!action.payload.errors) {
                state.all = action.payload;
            }
            state.status = "idle";
        },
        [postDatassistant.pending](state) {
            state.status = "loading";
          },
        [postDatassistant.rejected](state) {
            state.status = "idle";
        },
        [postDatassistant.fulfilled](state, action) {
            if (action.payload.errors) {
                state.errors = action.payload.errors;
            } else {
                state.errors = {};
                state.all.push(action.payload);
            }
            state.status = "idle";
        }
    }
})

export default datassistantsSlice.reducer;