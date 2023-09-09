import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    isAuthenticated: false,
    userId: null,
}

const AuthReducer = createReducer(initialState, {
    // FOR USER SIGNUP ---------------------

    SIGNUP_REQUEST: (state) => {
        state.loading = true;
    },
    SIGNUP_SUCCESS: (state, action) => {
        state.loading = false;
    },
    SIGNUP_FAILURE: (state, action) => {
        state.loading = false;
    },


    // FOR USER LOGIN --------------------

    LOGIN_REQUEST: (state) => {
        state.loading = true;
    },
    LOGIN_SUCCESS: (state, action) => {
        state.loading = false;
        state.userId = action.payload;
        state.isAuthenticated = true;
    },
    LOGIN_FAILURE: (state, action) => {
        state.loading = false;
    },


    // FOR USER LOGOUT -------------------

    LOGOUT_REQUEST: (state) => {
        state.loading = true;
    },
    LOGOUT_SUCCESS: (state, action) => {
        state.loading = false;
        state.userId = null;
        state.isAuthenticated = false;
    },
    LOGOUT_FAILURE: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    // Logged in

    LOGGED_IN: (state, action) => {
        state.isAuthenticated = true;
        state.userId = action.payload;
    }
});

export default AuthReducer;
