import Story from "../../models/Story.js";
import { asyncError } from "../../utils/errors/asyncError.js";
import ErrorHandler from "../../utils/errors/errorHandler.js";

const getMyStory = asyncError(async (req, res, next) => {
    const user = req.user;

    const story = await Story.findOne({ user: user._id });
    if (!story) {
        return res.status(200).json({
            msg: "YOU_HAVE_NO_STOY",
            story : null
        });
    }

    return res.status(200).json({
        msg: "STORY_FETCHED",
        story
    });
});
export default getMyStory;