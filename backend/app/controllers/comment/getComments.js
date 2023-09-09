import Comment from "../../models/Comment.js";
import { asyncError } from "../../utils/errors/asyncError.js";
import ErrorHandler from "../../utils/errors/errorHandler.js";

const getComments = asyncError(async (req, res, next) => {
    const postId = req.params.id;

    const comments = await Comment.find({ post: postId });
    if (!comments) {
        return next(new ErrorHandler());
    }

    return res.status(200).json({
        msg: "ALL_COMMENTS_FETCHED_SUCCESFULLY",
        comments
    })
})
export default getComments;