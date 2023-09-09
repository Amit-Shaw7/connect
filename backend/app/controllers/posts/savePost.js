import Post from "../../models/Post.js";
import { asyncError } from "../../utils/errors/asyncError.js";
import ErrorHandler from "../../utils/errors/errorHandler.js";

const savePost = asyncError(async (req, res, next) => {
    const user = req.user;
    const { postId } = req.params;
    let saved = false;

    const post = await Post.findById(postId);
    if (!post) {
        return next(new ErrorHandler("POST_NOT_FOUND", 404));
    }

    if (post.savedBy.includes(user._id)) {
        post.savedBy = post.savedBy.filter(id => !id.equals(user._id));
        user.savedPosts = user.savedPosts.filter(id => !id.equals(post._id));
        saved = false;
    } else {
        post.savedBy.push(user._id);
        user.savedPosts.push(post._id);
        saved = true;
    }

    await post.save();
    await user.save();

    return res.status(200).json({
        msg: saved ? "POST_SAVED_SUCCESFULLY" : "POST_UNSAVED_SUCCESFULLY",
        saved
    })
})
export default savePost;