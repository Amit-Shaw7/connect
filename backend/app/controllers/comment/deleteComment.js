import Comment from "../../models/Comment.js";
import Post from "../../models/Post.js";
import { asyncError } from "../../utils/errors/asyncError.js";
import ErrorHandler from "../../utils/errors/errorHandler.js";

const deleteComment = asyncError(async (req, res, next) => {
    const commentId = req.params.id;

    const comment = await Comment.findByIdAndDelete(commentId);
    if (!comment) {
        return next(new ErrorHandler("COMMENT_NOT_FOUND" , 404));
    }

    const post = await Post.findById(comment?.post);
    if(!post){
        return next(new ErrorHandler("POST_NOT_FOUND" , 404));
    }

    post.comments = post.comments.filter((id) => !id.equals(commentId));
    await post.save();

    return res.status(200).json({
        msg: "COMMENT_DELETE_SUCCESFULLY",
        comment
    })
})
export default deleteComment;