import Post from "../../models/Post.js";
import User from "../../models/User.js";
import { asyncError } from "../../utils/errors/asyncError.js";
import ErrorHandler from "../../utils/errors/errorHandler.js";

const createPost = asyncError(async (req, res, next) => {
    const user = req.user;
    const post = await Post.create({
        user: user._id,
        ...req.body
    });
    user.posts.push(post._id);
    await user.save();

    return res.status(200).json({
        msg: "POST_CREATED_SUCCESFULLY",
        post
    })
})
export default createPost;