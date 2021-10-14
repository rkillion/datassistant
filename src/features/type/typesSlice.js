import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchBaseTypes = createAsyncThunk("types/fetchBaseTypes", () => {
    return fetch('/base_types')
        .then((response) => response.json())
        .then((data) => data);
    });

// export const fetchDatassistant = createAsyncThunk("datassistants/fetchDatassistant", (id) => {
//     return fetch(`/datassistants/${id}`)
//         .then((response) => response.json())
//         .then((data) => data);
//     });

// export const postDatassistant = createAsyncThunk("datassistants/postDatassistant", (datassistant) => {
//     return fetch('/datassistants', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(datassistant)
//     })
//         .then((response) => response.json())
//         .then((data) => data);
//     });

const initialState = {
    baseTypes: [],
    errors: {},
    current: {},
    status: "idle", // loading state
};

const typesSlice = createSlice({
    name: "types",
    initialState,
    reducers: {

    },
    extraReducers: {
        [fetchBaseTypes.pending](state) {
            state.status = "loading";
          },
        [fetchBaseTypes.rejected](state) {
            state.status = "idle";
        },
        [fetchBaseTypes.fulfilled](state, action) {
            if (!action.payload.errors) {
                state.baseTypes = action.payload;
            }
            state.status = "idle";
        }
    }
})

export default typesSlice.reducer;