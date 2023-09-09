import Post from "../../models/Post.js";
import { asyncError } from "../../utils/errors/asyncError.js";
import ErrorHandler from "../../utils/errors/errorHandler.js";

// Fetches posts based on createdAt for the explore page

const getMyPosts = asyncError(async (req, res, next) => {
    const { query } = req.query;
    const user = req.user;
    let posts = [];

    if (query === "trending") {
        posts = await Post.find({ user: user._id }).sort({ likes: 1 }).populate("user");
    } else if (query === "oldest") {
        posts = await Post.find({ user: user._id }).sort({ createdAt: 1 }).populate("user");
    } else if (query === "latest") {
        posts = await Post.find({ user: user._id }).sort({ createdAt: -1 }).populate("user");
    }

    return res.status(200).json({
        msg: "FEED_FETCHED_SUCCESFULLY",
        posts
    });
});

export default getMyPosts;