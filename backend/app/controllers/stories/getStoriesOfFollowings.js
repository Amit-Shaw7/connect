import Post from "../../models/Post.js";
import Story from "../../models/Story.js";
import { asyncError } from "../../utils/errors/asyncError.js";
import ErrorHandler from "../../utils/errors/errorHandler.js";

// Fetches posts based on createdAt for the explore page

const getStoriesOfFollowings = asyncError(async (req, res, next) => {
    const user = req.user;
    const stories = await Story.find({ user: { $in: user.followings } });

    if (!stories) {
        return res.status(200).json({
            msg: "STORIES_FETCHED_SUCCESFULLY",
            stories : []
        });
    }

    return res.status(200).json({
        msg: "STORIES_FETCHED_SUCCESFULLY",
        stories
    });
});

export default getStoriesOfFollowings;