import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk("user/fetchUser", () => {
    return fetch('/me')
        .then((response) => response.json())
        .then((data) => data);
    });

export const loginUser = createAsyncThunk("user/loginUser", (credentials) => {
    return fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then((response) => response.json())
        .then((data) => data);
    });

export const signupUser = createAsyncThunk("user/signupUser", (credentials) => {
    return fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then((response) => response.json())
        .then((data) => data);
    });

export const logoutUser = createAsyncThunk("user/logoutUser", () => {
    return fetch(`/logout`, {
        method: 'DELETE'
      })
        .then((response) => response.json())
        .then((data) => data);
    });

const initialState = {
    current: {}, // user data
    authChecked: false,
    errors: {},
    status: "idle", // loading state
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      userUpdate(state, action) {
        state.current = action.payload;
      }
    },
      extraReducers: {
        [fetchUser.pending](state) {
          state.status = "loading";
        },
        [fetchUser.rejected](state) {
            state.status = "idle";
            state.authChecked = true;
          },
        [fetchUser.fulfilled](state, action) {
            if (!action.payload.errors) {
                state.current = action.payload;
            }
          state.authChecked = true;
          state.status = "idle";
        },
        [loginUser.pending](state) {
            state.status = "loading";
          },
        [loginUser.rejected](state) {
            state.status = "idle";
        },
        [loginUser.fulfilled](state, action) {
            if (action.payload.errors) {
                state.errors = action.payload;
            } else {
                state.errors = {};
                state.current = action.payload;
            }
            state.status = "idle";
        },
        [signupUser.pending](state) {
            state.status = "loading";
          },
        [signupUser.rejected](state) {
            state.status = "idle";
        },
        [signupUser.fulfilled](state, action) {
            if (action.payload.errors) {
                state.errors = action.payload;
            } else {
                state.errors = {};
                state.current = action.payload;
            }
            state.status = "idle";
        },
        [logoutUser.pending](state) {
            state.status = "loading";
          },
        [logoutUser.rejected](state) {
            state.status = "idle";
        },
        [logoutUser.fulfilled](state, action) {
            if (action.payload.errors) {
                state.errors = action.payload;
            } else {
                state.errors = {};
                state.current = {};
            }
            state.status = "idle";
        }
      }
  });
  
  export const { userUpdate } = userSlice.actions;
  
  export default userSlice.reducer;
