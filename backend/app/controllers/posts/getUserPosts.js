import Post from "../../models/Post.js";
import { asyncError } from "../../utils/errors/asyncError.js";

// Fetches latest posts based on createdAt

const getUserPosts = asyncError(async (req, res, next) => {
    const { page, limit } = req.query;
    const userId = req.params.id;
    const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(limit, 10) || 5,
        populate: "user",
        sort: { createdAt: -1 }
    };

    const posts = await Post.paginate({ user: userId } , options)
    if (!posts) {
        return res.status(200).json({
            msg: "POSTS_FETCHED_SUCCESFULLY",
            posts: []
        });
    }

    return res.status(200).json({
        msg: "POSTS_FETCHED_SUCCESFULLY",
        posts
    });
});

export default getUserPosts;