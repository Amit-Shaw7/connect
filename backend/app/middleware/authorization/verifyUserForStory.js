import Post from "../../models/Post.js";
import Story from "../../models/Story.js";
import { asyncError } from "../../utils/errors/asyncError.js";
import ErrorHandler from "../../utils/errors/errorHandler.js";

const verifyUserForStory = asyncError(async (req, res, next) => {
    const user = req.user;
    const storyId = req.params.id;
    
    const story = await Story.findById(storyId);
    if(!story){
        return next(new ErrorHandler("STORY_NOT_FOUND" , 404));
    }
    
    if (!story.user.equals(user._id)) {
        return next(new ErrorHandler("NOT_PERMITTED"));
    }
    next();
});

export default verifyUserForStory;