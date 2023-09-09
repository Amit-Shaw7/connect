import Post from "../../models/Post.js";
import { asyncError } from "../../utils/errors/asyncError.js";

// Fetches posts based on createdAt for the explore page

const getPostsForExplore = asyncError(async (req, res, next) => {
    const {query} = req.query;
    let posts = [];
    if (query === "trending") {
        posts = await Post.find().sort({ likes: 1 }).populate("user"); // Fetch top 10 trending posts
    } else if (query === "latest") {
        posts = await Post.find().sort({ createdAt: -1 }).populate("user"); // Fetch top 10 trending posts
    } else if (query === "oldest") {
        posts = await Post.find().sort({ createdAt: 1 }).populate("user"); // Fetch top 10 trending posts
    } else {
        return res.status(200).json({
            msg: "POSTS_FETCHED_SUCCESFULLY",
            posts : []
        }); 
    }

    return res.status(200).json({
        msg: "POSTS_FETCHED_SUCCESFULLY",
        posts
    });
});

export default getPostsForExplore;