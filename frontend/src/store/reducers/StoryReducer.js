import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    stories: [],
    myStory: null
}

const StoryReducer = createReducer(initialState, {
    // FOR USER SIGNUP ---------------------
    ADD_STORY_REQUEST: (state, action) => {
        state.loading = false;
    },
    ADD_STORY_SUCCESS: (state, action) => {
        state.loading = false;
        state.myStory = action.payload;
    },
    ADD_STORY_FAILURE: (state, action) => {
        state.myStoryPresent = false;
        state.loading = false;
        state.stories = [];
    },

    FETCH_MY_STORY: (state , action) => {
        state.myStory = action.payload;
    },


    FETCH_STORIES_REQUEST: (state) => {
        state.loading = true;
    },
    FETCH_STORIES_SUCCESS: (state, action) => {
        state.loading = false;
        state.stories = action.payload;
    },
    FETCH_STORIES_FAILURE: (state) => {
        state.loading = false;
        state.stories = [];
    },


});

export default StoryReducer;
