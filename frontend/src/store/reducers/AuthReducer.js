import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    userId: null,
}

const AuthReducer = createReducer(initialState, {
    // FOR USER LOGIN --------------------
    LOGIN_SUCCESS: (state, action) => {
        state.userId = action.payload;
        state.isAuthenticated = true;
    },

    // FOR USER LOGOUT -------------------
    LOGOUT_SUCCESS: (state) => {
        state.userId = null;
        state.isAuthenticated = false;
    },

    // Logged in
    LOGGED_IN: (state, action) => {
        state.isAuthenticated = true;
        state.userId = action.payload;
    }
});

export default AuthReducer;
