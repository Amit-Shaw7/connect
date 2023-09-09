import express from "express";
import { isLoggedIn } from "../middleware/authorization/isLoggedIn.js";

import validateAddComment from "../controllers/comment/validators/validateAddComment.js";
import addComment from "../controllers/comment/addComment.js";
import validateGetComments from "../controllers/comment/validators/validateGetComments.js";
import getComment from "../controllers/comment/getComment.js";
import getComments from "../controllers/comment/getComments.js";
import likeAComment from "../controllers/comment/likeAComment.js";
import dislikeAComment from "../controllers/comment/dislikeAComment.js";
import checkUserPresent from "../middleware/authorization/checkUserPresent.js";
import validateLikeDislikeDeleteComment from "../controllers/comment/validators/validateLikeDislikeDeleteComment.js";
import deleteComment from "../controllers/comment/deleteComment.js";
import updateComment from "../controllers/comment/updateComment.js";
import validateUpdateComment from "../controllers/comment/validators/validateUpdateComment.js";
import verifyUserForOwnComments from "../middleware/authorization/verifyUserForOwnComments.js";


const CommentRouter = express.Router();


CommentRouter.get("/all/:id", // post id
    validateGetComments,
    getComments
);

CommentRouter.post("/add/:id", // post id
    isLoggedIn,
    checkUserPresent,
    validateAddComment,
    addComment
);

CommentRouter.get("/:id", // post id
    validateGetComments,
    getComment
);

CommentRouter.patch("/like/:id", // comment id
    isLoggedIn,
    checkUserPresent,
    validateLikeDislikeDeleteComment,
    likeAComment
);

CommentRouter.patch("/dislike/:id", // comment id
    isLoggedIn,
    checkUserPresent,
    validateLikeDislikeDeleteComment,
    dislikeAComment
);

CommentRouter.delete("/delete/:id", // comment id
    isLoggedIn,
    checkUserPresent,
    validateLikeDislikeDeleteComment,
    verifyUserForOwnComments,
    deleteComment
);

CommentRouter.patch("/update/:id", // comment id
    isLoggedIn,
    checkUserPresent,
    validateUpdateComment,
    verifyUserForOwnComments,
    updateComment
);


// requires authentications

export default CommentRouter;