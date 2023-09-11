import Story from "../../models/Story.js";
import { asyncError } from "../../utils/errors/asyncError.js";
import ErrorHandler from "../../utils/errors/errorHandler.js";

const deleteStory = asyncError(async (req, res, next) => {
    const user = req.user;
    const storyId = req.params.id;

    const story = await Story.findByIdAndDelete(storyId);
    if(!story){
        return next(new ErrorHandler("STORY_NOT_FOUND", 404));
    }

    return res.status(200).json({
        msg: "STORY_DELETED_SUCCESFULLY",
        story : story
    })
})
export default deleteStory;