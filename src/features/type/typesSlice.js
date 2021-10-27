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

export const fetchTypes = createAsyncThunk("types/fetchTypes", (datassistant_id) => {
    return fetch(`/types?datassistant_id=${datassistant_id}`)
        .then((response) => response.json())
        .then((data) => data);
    });

export const fetchBaseType = createAsyncThunk("types/fetchBaseType", ({ id, datassistant_id }) => {
    return fetch(`/base_types/${id}?datassistant_id=${datassistant_id}`)
        .then((response) => response.json())
        .then((data) => data);
    });

const initialState = {
    baseTypes: [],
    all: [],
    errors: {},
    current: {},
    allFetched: [],
    status: "idle", // loading state
};

const typesSlice = createSlice({
    name: "types",
    initialState,
    reducers: {
        addCurrentSubtype(state,action){
            state.current.sub_types.push(action.payload)
        },
        addCurrentInstance(state,action){
            state.current.instances.push(action.payload)
        },
        setCurrentType(state,action){
            state.current = action.payload;
        },
        replaceFetchedTypes(state,action) {
            let newFetchList = state.allFetched.filter(type=>type.id!==action.payload.id);
            newFetchList.push(action.payload);
            state.allFetched = newFetchList;
        },
        addInstanceToAllFetchedTypes(state,action) {
            action.payload.parent_path.forEach(type=>{
                let fetchedType = state.allFetched.find(fetched=>fetched.id===type.id)
                if (fetchedType) {
                    fetchedType.instances.push(action.payload);
                }
            })
        }
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
                // state.current = action.payload;
                state.allFetched.push(action.payload);
            }
            state.status = "idle";
        },
        [fetchTypes.pending](state) {
            state.status = "loading";
          },
        [fetchTypes.rejected](state) {
            state.status = "idle";
        },
        [fetchTypes.fulfilled](state, action) {
            if (action.payload.errors) {
                state.errors = action.payload
            } else {
                state.all = action.payload;
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

export const { setCurrentType, addCurrentInstance, addCurrentSubtype, replaceFetchedTypes, addInstanceToAllFetchedTypes } = typesSlice.actions