import Comment from "../../models/Comment.js";
import { asyncError } from "../../utils/errors/asyncError.js";
import ErrorHandler from "../../utils/errors/errorHandler.js";

const likeAComment = asyncError(async (req, res, next) => {
    const user = req.user;
    const id = req.params.id;
    let liked = false;

    const comment = await Comment.findById(id);
    if (!comment) {
        return next(new ErrorHandler());
    }

    if (comment.likes.includes(user._id)) {
        comment.likes = comment.likes.filter(id => !id.equals(user._id));
        liked = false;
        console.log();
    } else {
        comment.dislikes = comment.dislikes.filter(id => !id.equals(user._id));
        comment.likes.push(user._id);
        liked = true;
    }

    await comment.save();

    return res.status(200).json({
        msg: liked ? "COMMENT_LIKED_SUCCESFULLY" : "COMMENT_UNLIKED_SUCCESFULLY",
        liked
    })
})
export default likeAComment;