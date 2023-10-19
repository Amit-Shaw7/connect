import Post from "../../models/Post.js";
import User from "../../models/User.js";
import { asyncError } from "../../utils/errors/asyncError.js";

// Fetches latest posts based on createdAt

const getAllLikedPosts = asyncError(async (req, res, next) => {
    const { page, limit } = req.query;
    const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(limit, 10) || 5,
        populate: "user",
        sort: { createdAt: -1 }
    }

    const user = req.user;
    const likedPosts = await Post.paginate({ _id: { $in: user.likedPosts } }, options);
    if (!likedPosts) {
        return res.status(200).json({
            msg: "POSTS_FETCHED_SUCCESFULLY",
            posts: []
        });
    }

    return res.status(200).json({
        msg: "POSTS_FETCHED_SUCCESFULLY",
        posts: likedPosts
    });
});

export default getAllLikedPosts;