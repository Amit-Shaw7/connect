import Post from "../../models/Post.js";
import { asyncError } from "../../utils/errors/asyncError.js";
import ErrorHandler from "../../utils/errors/errorHandler.js";

// Fetches posts based on createdAt for the explore page

const getPostsForFeed = asyncError(async (req, res, next) => {
    const { query, page, limit } = req.query;
    const user = req.user;
    let posts = [];
    const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(limit, 10) || 5,
        populate: "user",
        sort:
            (query === "trending" && { likes: -1 }) ||
            (query === "latest" && { createdAt: -1 }) ||
            (query === "oldest" && { createdAt: 1 })
    }


    user.followings.push(user._id);

    if (query === "trending" || query === "" || !query) {
        posts = await Post.paginate({ user: { $in: user.followings } }, options)
    } else if (query === "oldest") {
        posts = await Post.paginate({ user: { $in: user.followings } }, options)
    } else if (query === "latest") {
        posts = await Post.paginate({ user: { $in: user.followings } }, options)
    }

    return res.status(200).json({
        msg: "FEED_FETCHED_SUCCESFULLY",
        posts
    });
});

export default getPostsForFeed;