import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    posts: [],
    myposts: [],
    savedPosts: [],
    likedPosts: [],
}

const PostReducer = createReducer(initialState, {
    // Add post

    ADD_POST_REQUEST: (state) => {
        state.loading = true;
    },
    ADD_POST_SUCCESS: (state, action) => {
        state.loading = false;
        state.posts = [action.payload , ...state.posts];
    },
    ADD_POST_FAILURE: (state, action) => {
        state.loading = false;
        state.user = null;
    },

    // Get all posts
    GET_ALL_POST_REQUEST: (state) => {
        state.loading = true;
    },
    GET_ALL_POST_SUCCESS: (state, action) => {
        state.loading = false;
        state.posts = action.payload;
    },
    GET_ALL_POST_FAILURE: (state, action) => {
        state.loading = false;
        state.posts = null;
    },

    // Get my posts
    GET_MY_POST_REQUEST: (state) => {
        state.loading = true;
    },
    GET_MY_POST_SUCCESS: (state, action) => {
        state.loading = false;
        state.myposts = action.payload;
    },
    GET_MY_POST_FAILURE: (state, action) => {
        state.loading = false;
    },

    // Get saved posts
    GET_SAVED_POST_SUCCESS: (state, action) => {
        state.loading = false;
        state.savedPosts = action.payload;
    },

    // Get liked posts
    GET_LIKED_POST_SUCCESS: (state, action) => {
        state.loading = false;
        state.likedPosts = action.payload;
    },

    // Like unlike posts

    LIKE_POST_SUCCESS: (state, action) => {
        state.loading = false;
        if (!action.payload.liked) {
            state.likedPosts = state.likedPosts.filter((post) => post._id !== action.payload.postId);
        }
    },

    SAVE_POST_SUCCESS: (state, action) => {
        state.loading = false;
        if (!action.payload.saved) {
            state.savedPosts = state.savedPosts.filter((post) => post._id !== action.payload.postId);
        }
    },

    // Delete post
    DELETE_POST_SUCCESS: (state, action) => {
        state.myposts = state.myposts.filter((post) => post._id !== action.payload);
    },
    
    // Toggle loading
    START_LOADER: (state) => {
        state.loading = true;
    },
    STOP_LOADER: (state) => {
        state.loading = false;
    }
});

export default PostReducer;
