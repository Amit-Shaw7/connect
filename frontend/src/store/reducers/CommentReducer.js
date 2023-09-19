import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    comments: [],
}

const CommentReducer = createReducer(initialState, {
    // FOR USER SIGNUP ---------------------
    ADD_COMMENT_SUCCESS: (state, action) => {
        state.comments = [...state.comments, action.payload];
    },
    ADD_COMMENT_FAILURE: (state) => {
        state.comments = [];
    },

    FETCH_COMMENT_SUCCESS: (state, action) => {
        state.comments = action.payload;
    },
    FETCH_COMMENT_FAILURE: (state) => {
        state.comments = [];
    },

    DELETE_COMMENT_SUCCESS: (state, action) => {
        state.comments = state.comments.filter((comment) => comment._id !== action.payload);
    },

    // Logout
    RESET_COMMENT_STATE : (state) => {
        state.comments = [];
    }

});

export default CommentReducer;
