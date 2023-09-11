import Story from "../../models/Story.js";
import { asyncError } from "../../utils/errors/asyncError.js";
import ErrorHandler from "../../utils/errors/errorHandler.js";

const updateStory = asyncError(async (req, res, next) => {
    const user = req.user;
    const storyId = req.params.id;

    const story = await Story.findByIdAndUpdate(storyId , {...req.body} , {new : true});

    if(!story){
        return next(new ErrorHandler("STORY_NOT_FOUND", 404));
    }

    return res.status(200).json({
        msg: "STORY_UPDATED_SUCCESSFULLY",
        story : story
    })
})
export default updateStory;