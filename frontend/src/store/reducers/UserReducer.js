import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    followers: [],
    followings: [],
    user: null,
    suggestedUsers: [],
    selectedUser: null,
}

const UserReducer = createReducer(initialState, {
    // Load user

    LOAD_USER_REQUEST: (state) => {
        state.loading = true;
    },
    LOAD_USER_SUCCESS: (state, action) => {
        state.loading = false;
        state.user = action.payload;
    },
    LOAD_USER_FAILURE: (state, action) => {
        state.loading = false;
        state.user = {};
    },
    // Load user

    EDIT_PROFILE_REQUEST: (state) => {
        state.loading = true;
    },
    EDIT_PROFILE_SUCCESS: (state, action) => {
        state.loading = false;
        state.user = action.payload;
    },
    EDIT_PROFILE_FAILURE: (state, action) => {
        state.loading = false;
    },

    // FETCH_FOLLOWERS
    FETCH_FOLLOWERS_SUCCESS: (state, action) => {
        state.followers = action.payload;
    },
    FETCH_FOLLOWERS_FAILURE: (state, action) => {
        state.followers = [];
    },
    // FETCH_FOLLOWings
    FETCH_FOLLOWINGS_SUCCESS: (state, action) => {
        state.followings = action.payload;
    },
    FETCH_FOLLOWINGS_FAILURE: (state, action) => {
        state.followings = [];
    },

    // FETCH_SUGGESTED_USERS
    FETCH_SUGGESTED_USERS_REQUEST: (state, payload) => {
        state.loading = true;
    },
    FETCH_SUGGESTED_USERS_SUCCESS: (state, action) => {
        state.suggestedUsers = action.payload;
        state.loading = false;
    },
    FETCH_SUGGESTED_USERS_FAILURE: (state, action) => {
        state.suggestedUsers = {};
        state.loading = false;
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






    // Get selected user

});

export default UserReducer;
