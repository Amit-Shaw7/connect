import Post from "../../models/Post.js";
import { asyncError } from "../../utils/errors/asyncError.js";

// Fetches posts based on createdAt for the explore page

const getPostsForExplore = asyncError(async (req, res, next) => {
    const { query, page, limit } = req.query;
    const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(limit, 10) || 5,
        populate: "user",
        sort:
            query === "trending" && { likes: 1 } ||
            query === "latest" && { createdAt: -1 } ||
            query === "oldest" && { createdAt: 1 }
    };

    let posts = [];
    if (query === "trending") {
        posts = await Post.paginate(options);
    } else if (query === "latest") {
        posts = await Post.paginate(options);
    } else if (query === "oldest") {
        posts = await Post.paginate(options);
    } else {
        return res.status(200).json({
            msg: "POSTS_FOR_EXPLORE_PAGE_FETCHED_SUCCESFULLY",
            posts: []
        });
    }

    return res.status(200).json({
        msg: "POSTS_FOR_EXPLORE_PAGE_FETCHED_SUCCESFULLY",
        posts
    });
});

export default getPostsForExplore;