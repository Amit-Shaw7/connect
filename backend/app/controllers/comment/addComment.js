import Comment from "../../models/Comment.js";
import Post from "../../models/Post.js";
import { asyncError } from "../../utils/errors/asyncError.js";
import ErrorHandler from "../../utils/errors/errorHandler.js";

const addComment = asyncError(async (req, res, next) => {
    const user = req.user;
    req.body.user = user._id;
    req.body.post = req.params.id;

    const comment = await Comment.create({...req.body});
    const post = await Post.findById(req.params.id);

    post.comments.push(comment._id);
    await comment.save();
    await post.save();
    
    if (!comment) {
        return next(new ErrorHandler());
    }

    return res.status(200).json({
        msg: "COMMENTED_SUCCESFULLY",
        comment
    })
})
export default addComment;