import Comment from "../../models/Comment.js";
import { asyncError } from "../../utils/errors/asyncError.js";
import ErrorHandler from "../../utils/errors/errorHandler.js";

const dislikeAComment = asyncError(async (req, res, next) => {
    const user = req.user;
    const id = req.params.id;
    let disliked = false;

    const comment = await Comment.findById(id);
    if (!comment) {
        return next(new ErrorHandler());
    }

    if (comment.dislikes.includes(user._id)) {
        comment.dislikes = comment.dislikes.filter((id) => !id.equals(user._id));
        disliked = false;
    } else {
        if(comment.likes.includes(user._id)){
            comment.likes = comment.likes.filter((id) => !id.equals(user._id));
        }
        comment.dislikes.push(user._id);
        disliked = true;
    }

    await comment.save();

    return res.status(200).json({
        msg: disliked ? "COMMENT_DISLIKED_SUCCESFULLY" : "COMMENT_UNDISLIKED_SUCCESFULLY",
        disliked
    })
})
export default dislikeAComment;