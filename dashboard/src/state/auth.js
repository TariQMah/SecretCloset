import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    isAuthenticated: !!localStorage.getItem('token') || false,
    token: localStorage.getItem('token') || null
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state) => {
            state.isAuthenticated = state.isAuthenticated === true ? false : true;
            state.user = state.user
            state.token = state.token;
        },
        logout: (state) => {
            state.token = null;
            state.user = {}
            state.isAuthenticated = false
            localStorage.removeItem('token');
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;