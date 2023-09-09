import Post from "../../models/Post.js";
import { asyncError } from "../../utils/errors/asyncError.js";
import ErrorHandler from "../../utils/errors/errorHandler.js";

const likePost = asyncError(async (req, res, next) => {
    const user = req.user;
    const { postId } = req.params;
    let liked = false;

    const post = await Post.findById(postId);
    if (!post) {
        return next(new ErrorHandler("POST_NOT_FOUND", 404));
    }

    if (post.likes.includes(user._id)) {
        post.likes = post.likes.filter(id => !id.equals(user._id));
        user.likedPosts = user.likedPosts.filter(id => !id.equals(post._id));
        liked = false;
    } else {
        post.likes.push(user._id);
        user.likedPosts.push(post._id);
        liked = true;
    }

    await post.save();
    await user.save();

    return res.status(200).json({
        msg: liked ? "POST_LIKED_SUCCESFULLY" : "POST_REMOVED_FROM_LIKES",
        liked
    })
})
export default likePost;