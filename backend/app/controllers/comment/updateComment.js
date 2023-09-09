import Comment from "../../models/Comment.js";
import Post from "../../models/Post.js";
import { asyncError } from "../../utils/errors/asyncError.js";
import ErrorHandler from "../../utils/errors/errorHandler.js";

const updateComment = asyncError(async (req, res, next) => {
    console.log("Hello");
    const commentId = req.params.id;

    const comment = await Comment.findByIdAndUpdate(commentId, { ...req.body }, { new: true });
    if (!comment) {
        return next(new ErrorHandler("INTERNAL_SERVER_ERROR" , 500));
    }

    return res.status(200).json({
        msg: "COMMENT_UPDATED_SUCCESFULLY",
        comment
    })
})
export default updateComment;