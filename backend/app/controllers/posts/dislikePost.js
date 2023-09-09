import Post from "../../models/Post.js";
import { asyncError } from "../../utils/errors/asyncError.js";
import ErrorHandler from "../../utils/errors/errorHandler.js";

const dislikePost = asyncError(async (req, res, next) => {
    const user = req.user;
    const { postId } = req.params;
    const disliked = false;

    const post = await Post.findById(postId);
    if (!post) {
        return next(new ErrorHandler("POST_NOT_FOUND", 404));
    }

    if (post.dislikes.includes(user._id)) {
        post.dislikes = post.dislikes.filter(id => !id.equals(user._id));
        user.dislkedPosts = user.dislkedPosts.filter(id => !id.equals(post._id));
        disliked = true;
    } else {
        post.dislikes.push(user._id);
        user.dislkedPosts.push(post._id);
        disliked = false;
    }

    await post.save();
    await user.save();

    return res.status(200).json({
        msg: disliked ? "POST_DISLIKED_SUCCESFULLY" : "POST_REMOVED_FROM_DISLIKED",
    })
})
export default dislikePost;