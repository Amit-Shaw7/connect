import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    posts: [], // for explore page
    feed: [], // for home page
    myposts: [], // for mypost page
    savedPosts: [], // for saved posts page 
    likedPosts: [], // for liked posts page
}

const PostReducer = createReducer(initialState, {
    // Add post
    ADD_POST_SUCCESS: (state, action) => {
        state.feed = [action.payload, ...state.feed];
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
    },


    // New flow
    APPEND_POSTS_FOR_EXPLORE_FEED: (state, action) => {
        console.log(action.payload);
        state.posts = [...state.posts, ...action.payload];
    },
    CLEAR_EXPLORE_FEED: (state, action) => {
        state.posts = [];
    },

    APPEND_POSTS_FOR_HOME_FEED: (state, action) => {
        console.log(action.payload);
        state.feed = [...state.feed, ...action.payload];
    },
    CLEAR_HOME_FEED: (state, action) => {
        state.feed = []; 
    },

    APPEND_POSTS_FOR_MYPOSTS_FEED: (state, action) => {
        console.log(action.payload);
        state.myposts = [...state.myposts, ...action.payload];
    },
    CLEAR_MYPOSTS_FEED: (state, action) => {
        state.myposts = [];
    },

    APPEND_POSTS_FOR_SAVED_POSTS_FEED: (state, action) => {
        console.log(action.payload);
        state.savedPosts = [...state.savedPosts, ...action.payload];
    },
    CLEAR_SAVED_POSTS_FEED: (state, action) => {
        state.savedPosts = [];
    },


    APPEND_POSTS_FOR_LIKED_POSTS_FEED: (state, action) => {
        state.likedPosts = [...state.likedPosts, ...action.payload];
    },
    CLEAR_LIKED_POSTS_FEED: (state, action) => {
        state.likedPosts = [];
    },
});

export default PostReducer;
