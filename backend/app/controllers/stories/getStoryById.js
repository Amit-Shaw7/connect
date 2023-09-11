import Story from "../../models/Story.js";
import { asyncError } from "../../utils/errors/asyncError.js";
import ErrorHandler from "../../utils/errors/errorHandler.js";

const getStoryById = asyncError(async (req, res, next) => {
    const user = req.user;
    const storyId = req.params.id;

    const story = await Story.findById(storyId);
    if (!story) {
        return next(new ErrorHandler("STORY_NOT_FOUND", 404));
    }

    return res.status(200).json({
        msg: "STORY_FETCHED",
        story
    });
});
export default getStoryById;