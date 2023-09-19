import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    mode: localStorage.getItem("mode") || "light",
}

const AppReducer = createReducer(initialState, {
    // FOR USER LOGIN --------------------
    TOGGLE_MODE: (state, action) => {
        if (state.mode === "light") {
            state.mode = "dark";
        } else {
            state.mode = "light";
        }
    },
});

export default AppReducer;
