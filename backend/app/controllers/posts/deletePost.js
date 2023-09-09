import Post from "../../models/Post.js";
import { asyncError } from "../../utils/errors/asyncError.js";
import ErrorHandler from "../../utils/errors/errorHandler.js";

const deletePost = asyncError(async (req, res, next) => {
    const user = req.user;
    const { postId } = req.params;

    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) {
        return next(new ErrorHandler("POST_NOT_FOUND", 404));
    }
    user.posts = user.posts.filter(id => id.equals(deletedPost._id));
    await user.save();
    return res.status(200).json({
        msg: "POST_DELETED_SUCCESFULLY",
        post: deletedPost
    })
})
export default deletePost;