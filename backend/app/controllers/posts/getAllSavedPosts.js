import Post from "../../models/Post.js";
import { asyncError } from "../../utils/errors/asyncError.js";

// Fetches latest posts based on createdAt

const getAllSavedPosts = asyncError(async (req, res, next) => {
    const user = req.user;
    const { page, limit } = req.query;
    const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(limit, 10) || 5,
        populate: "user",
        sort: { createdAt: -1 }
    }
    const savedPosts = await Post.paginate({ _id: { $in: user.savedPosts } } , options);
    if (!savedPosts) {
        return res.status(200).json({
            msg: "POSTS_FETCHED_SUCCESFULLY",
            posts: []
        });
    }

    return res.status(200).json({
        msg: "POSTS_FETCHED_SUCCESFULLY",
        posts: savedPosts
    });
});

export default getAllSavedPosts;