import Post from "../../models/Post.js";
import { asyncError } from "../../utils/errors/asyncError.js";
import ErrorHandler from "../../utils/errors/errorHandler.js";

const verifyUserForPost = asyncError(async (req, res, next) => {
    const user = req.user;
    const postId = req.params.postId;
    
    const post = await Post.findById(postId);
    if(!post){
        return next(new ErrorHandler("POST_NOT_FOUND" , 404));
    }
    
    if (!post.user.equals(user._id)) {
        return next(new ErrorHandler("NOT_PERMITTED"));
    }
    next();
});

export default verifyUserForPost;