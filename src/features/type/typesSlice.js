import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchBaseTypes = createAsyncThunk("types/fetchBaseTypes", () => {
    return fetch('/base_types')
        .then((response) => response.json())
        .then((data) => data);
    });

export const fetchType = createAsyncThunk("types/fetchType", (id) => {
    return fetch(`/types/${id}`)
        .then((response) => response.json())
        .then((data) => data);
    });

export const fetchBaseType = createAsyncThunk("types/fetchBaseType", ({ id, datassistant_id }) => {
    return fetch(`/base_types/${id}?datassistant_id=${datassistant_id}`)
        .then((response) => response.json())
        .then((data) => data);
    });

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
        },
        [fetchType.pending](state) {
            state.status = "loading";
          },
        [fetchType.rejected](state) {
            state.status = "idle";
        },
        [fetchType.fulfilled](state, action) {
            if (action.payload.errors) {
                state.errors = action.payload
            } else {
                state.current = action.payload;
            }
            state.status = "idle";
        },
        [fetchBaseType.pending](state) {
            state.status = "loading";
          },
        [fetchBaseType.rejected](state) {
            state.status = "idle";
        },
        [fetchBaseType.fulfilled](state, action) {
            if (action.payload.errors) {
                state.errors = action.payload
            } else {
                state.current = action.payload;
            }
            state.status = "idle";
        }
    }
})

export default typesSlice.reducer;