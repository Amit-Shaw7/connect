import Post from "../../models/Post.js";
import { asyncError } from "../../utils/errors/asyncError.js";
import ErrorHandler from "../../utils/errors/errorHandler.js";

const updatePost = asyncError(async (req, res, next) => {
    const { postId } = req.params;

    const updatedPost = await Post.findByIdAndUpdate(postId, req.body, { new: true });
    if (!updatedPost) {
        return next(new ErrorHandler("POST_NOT_FOUND", 404));
    }

    return res.status(200).json({
        msg: "POST_UPDATED_SUCCESFULLY",
        post: updatedPost
    })
})
export default updatePost;