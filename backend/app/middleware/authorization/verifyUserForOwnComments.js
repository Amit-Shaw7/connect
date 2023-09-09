import Comment from "../../models/Comment.js";
import Post from "../../models/Post.js";
import { asyncError } from "../../utils/errors/asyncError.js";
import ErrorHandler from "../../utils/errors/errorHandler.js";

const verifyUserForOwnComments = asyncError(async (req, res, next) => {
    const user = req.user;
    const commentId = req.params.id;
    
    const comment = await Comment.findById(commentId);
    if(!comment){
        return next(new ErrorHandler("COMMENT_NOT_FOUND" , 404));
    }

    if(!user._id.equals(comment.user)){
        return next(new ErrorHandler("NOT_PERMITTED" , 403));
    }
    next();
});

export default verifyUserForOwnComments;