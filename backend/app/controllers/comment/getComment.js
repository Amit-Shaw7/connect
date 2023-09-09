import Comment from "../../models/Comment.js";
import { asyncError } from "../../utils/errors/asyncError.js";
import ErrorHandler from "../../utils/errors/errorHandler.js";

const getComment = asyncError(async (req, res, next) => {
    const commentId = req.params.id;

    const comment = await Comment.findById(commentId);
    if (!comment) {
        return next(new ErrorHandler());
    }

    return res.status(200).json({
        msg: "COMMENT_FETCHED_SUCCESFULLY",
        comment
    })
})
export default getComment;