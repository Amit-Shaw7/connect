import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    comments: [],
}

const CommentReducer = createReducer(initialState, {
    // FOR USER SIGNUP ---------------------
    ADD_COMMENT_REQUEST: (state, action) => {
        state.loading = false;
    },
    ADD_COMMENT_SUCCESS: (state, action) => {
        state.loading = false;
        state.comments = [...state.comments, action.payload];
    },
    ADD_COMMENT_FAILURE: (state, action) => {
        state.loading = false;
        state.comments = [];
    },


    FETCH_COMMENT_REQUEST: (state) => {
        state.loading = true;
    },
    FETCH_COMMENT_SUCCESS: (state, action) => {
        state.loading = false;
        state.comments = action.payload;
    },
    FETCH_COMMENT_FAILURE: (state) => {
        state.loading = false;
        state.comments = [];
    },

    DELETE_COMMENT_SUCCESS: (state, action) => {
        state.comments = state.comments.filter((comment) => comment._id !== action.payload);
    },

});

export default CommentReducer;
