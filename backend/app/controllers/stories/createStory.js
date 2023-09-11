import Story from "../../models/Story.js";
import { asyncError } from "../../utils/errors/asyncError.js";

const createStory = asyncError(async (req, res, next) => {
    const user = req.user;
    const story = await Story.create({
        user: user._id,
        ...req.body
    });

    return res.status(200).json({
        msg: "STORY_CREATED_SUCCESFULLY",
        story : story
    })
})
export default createStory;