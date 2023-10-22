import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    followers: [],
    followings: [],
    user: null,
    suggestedUsers: [],
    selectedUser: null,
}

const UserReducer = createReducer(initialState, {
    // Load user
    LOAD_USER_SUCCESS: (state, action) => {
        state.user = action.payload;
    },
    LOAD_USER_FAILURE: (state, action) => {
        state.user = {};
    },

    // Edit profile
    EDIT_PROFILE_SUCCESS: (state, action) => {
        console.log(action.payload);
        state.user = action.payload;
    },


    // Fetch followers
    FETCH_FOLLOWERS_SUCCESS: (state, action) => {
        state.followers = action.payload;
    },
    FETCH_FOLLOWERS_FAILURE: (state, action) => {
        state.followers = [];
    },

    // fetch followings
    FETCH_FOLLOWINGS_SUCCESS: (state, action) => {
        state.followings = action.payload;
    },
    FETCH_FOLLOWINGS_FAILURE: (state, action) => {
        state.followings = [];
    },

    // FETCH_SUGGESTED_USERS
    FETCH_SUGGESTED_USERS_SUCCESS: (state, action) => {
        state.suggestedUsers = action.payload;
    },
    FETCH_SUGGESTED_USERS_FAILURE: (state, action) => {
        state.suggestedUsers = [];
    },

    FOLLOW_USER_SUCCESS: (state, action) => {
        if (state.user) {
            if (!state.user.followings.includes(action.payload)) {
                state.user.followings = [...state.user.followings, action.payload];
            }
        }
    },

    UNFOLLOW_USER_SUCCESS: (state, action) => {
        if (state.user) {
            if (state.user.followings.includes(action.payload)) {
                state.user.followings = state.user.followings.filter((id) => id !== action.payload);
            }
        }
    },

    // Logout
    RESET_USER_STATE : (state) => {
        state.followers = [];
        state.followings = [];
        state.selectedUser = {};
        state.suggestedUsers = [];
        state.user = null;
    }
});

export default UserReducer;
