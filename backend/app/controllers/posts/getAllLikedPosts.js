import Post from "../../models/Post.js";
import User from "../../models/User.js";
import { asyncError } from "../../utils/errors/asyncError.js";

// Fetches latest posts based on createdAt

const getAllLikedPosts = asyncError(async (req, res, next) => {
    const user = req.user;
    const likedPosts = await Post.find({_id : {$in : user.likedPosts}}).populate("user"); 
    if (!likedPosts) {
        return res.status(200).json({
            msg: "POSTS_FETCHED_SUCCESFULLY",
            posts: []
        });
    }

    return res.status(200).json({
        msg: "POSTS_FETCHED_SUCCESFULLY",
        posts : likedPosts
    });
});

export default getAllLikedPosts;