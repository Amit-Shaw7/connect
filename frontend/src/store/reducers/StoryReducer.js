import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    stories: [],
    myStory: null
}

const StoryReducer = createReducer(initialState, {
    FETCH_STORIES_SUCCESS: (state, action) => {
        state.stories = action.payload;
    },
    FETCH_STORIES_FAILURE: (state) => {
        state.stories = [];
    },

    FETCH_MY_STORY: (state , action) => {
        state.myStory = action.payload;
    },

    ADD_STORY_SUCCESS: (state, action) => {
        state.myStory = action.payload;
    },
    ADD_STORY_FAILURE: (state) => {
        state.myStoryPresent = false;
        state.stories = [];
    },

    EDIT_STORY_SUCCESS: (state, action) => {
        state.myStory.media = action.payload.media;
        state.myStory.text = action.payload.text;
        state.myStory.color = action.payload.color;
    },

    DELETE_STORY_SUCCESS: (state , action) => {
        state.myStory = null;
    },

    // Logout
    RESET_STORY_STATE : (state) => {
        state.myStory = null;
        state.stories = [];
    }
});

export default StoryReducer;
