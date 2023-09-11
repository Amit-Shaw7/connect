import Story from "../../models/Story.js";
import { asyncError } from "../../utils/errors/asyncError.js";
import ErrorHandler from "../../utils/errors/errorHandler.js";

const viewStory = asyncError(async (req, res, next) => {
    const user = req.user;
    const storyId = req.params.id;

    const story = await Story.findById(storyId);
    if (!story) {
        return next(new ErrorHandler("STORY_NOT_FOUND", 404));
    }

    story.viewedBy.push(user._id);
    await story.save();

    return res.status(200).json({
        msg: "STORY_VIEWED",
        story: story
    });
});
export default viewStory;