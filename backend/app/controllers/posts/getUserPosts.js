import Post from "../../models/Post.js";
import { asyncError } from "../../utils/errors/asyncError.js";

// Fetches latest posts based on createdAt

const getUserPosts = asyncError(async (req, res, next) => {
    const userId = req.params.id;
    const posts = await Post.find({user : userId}).populate("user"); // Fetch top 10 trending posts
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