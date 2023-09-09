import Post from "../../models/Post.js";
import { asyncError } from "../../utils/errors/asyncError.js";
import ErrorHandler from "../../utils/errors/errorHandler.js";

// Fetches latest posts based on createdAt

const getPostById = asyncError(async (req, res, next) => {
    const user = req.user;
    const postId = req.params.postId;

    const post = await Post.findById(postId).populate("user");
    if (!post) {
        return next(new ErrorHandler("POST_NOT_FOUND", 404));
    }

    return res.status(200).json({
        msg: "POST_FETCHED_SUCCESFULLY",
        post
    });
});

export default getPostById;