import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './reducers/AuthReducer';
import UserReducer from './reducers/UserReducer';
import PostReducer from './reducers/PostReducer';
import CommentReducer from './reducers/CommentReducer';
import StoryReducer from './reducers/StoryReducer';
import AppReducer from './reducers/AppReducer';


const Store = configureStore({
    reducer: {
        auth: AuthReducer,
        user: UserReducer,
        post: PostReducer,
        comment: CommentReducer,
        story: StoryReducer,
        app: AppReducer,
    },
});

export default Store;