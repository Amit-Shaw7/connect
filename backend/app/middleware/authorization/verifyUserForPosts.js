import Post from "../../models/Post.js";
import { asyncError } from "../../utils/errors/asyncError.js";
import ErrorHandler from "../../utils/errors/errorHandler.js";

const verifyUserForPosts = asyncError(async (req, res, next) => {
    const user = req.user;
    const postId = req.params.id;
    
    if(!user.posts.includes(postId)){
        return next(new ErrorHandler("NOT_PERMITTED" , 404));
    }
    
    next();
});

export default verifyUserForPosts;