import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    myposts: [],
    savedPosts: [],
    likedPosts: [],
}

const PostReducer = createReducer(initialState, {
    // Add post
    ADD_POST_SUCCESS: (state, action) => {
        state.posts = [action.payload, ...state.posts];
    },
    ADD_POST_FAILURE: (state) => {
        state.user = null;
    },

    // Get all posts
    GET_ALL_POST_SUCCESS: (state, action) => {
        state.posts = action.payload;
    },

    // Get my posts
    GET_MY_POST_SUCCESS: (state, action) => {
        state.myposts = action.payload;
    },

    // Get saved posts
    GET_SAVED_POST_SUCCESS: (state, action) => {
        state.savedPosts = action.payload;
    },

    // Get liked posts
    GET_LIKED_POST_SUCCESS: (state, action) => {
        state.likedPosts = action.payload;
    },

    // Like unlike posts

    LIKE_POST_SUCCESS: (state, action) => {
        if (!action.payload.liked) {
            state.likedPosts = state.likedPosts.filter((post) => post._id !== action.payload.postId);
        }
    },

    SAVE_POST_SUCCESS: (state, action) => {
        if (!action.payload.saved) {
            state.savedPosts = state.savedPosts.filter((post) => post._id !== action.payload.postId);
        }
    },

    // Delete post
    DELETE_POST_SUCCESS: (state, action) => {
        state.myposts = state.myposts.filter((post) => post._id !== action.payload);
    },

    // Logout
    RESET_POST_STATE: (state) => {
        state.likedPosts = [];
        state.myposts = [];
        state.posts = [];
        state.savedPosts = [];
    }
});

export default PostReducer;
