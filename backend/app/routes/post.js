import express from "express";
import { isLoggedIn } from "../middleware/authorization/isLoggedIn.js";
import validateCreatePost from "../controllers/posts/validators/validateCreatePost.js";
import createPost from "../controllers/posts/createPost.js";
import validateUpdatePost from "../controllers/posts/validators/validateUpdatePost.js";
import checkUserPresent from "../middleware/authorization/checkUserPresent.js";
import verifyUserForPost from "../middleware/authorization/verifyUserForPost.js";
import updatePost from "../controllers/posts/updatePost.js";
import validateLikeDislikePost from "../controllers/posts/validators/validateLikeDislikePost.js";
import likePost from "../controllers/posts/likePost.js";
import dislikePost from "../controllers/posts/dislikePost.js";
import savePost from "../controllers/posts/savePost.js";
import validateSavePost from "../controllers/posts/validators/validateSavePost.js";
import deletePost from "../controllers/posts/deletePost.js";
import getAllLikedPosts from "../controllers/posts/getAllLikedPosts.js";
import getAllSavedPosts from "../controllers/posts/getAllSavedPosts.js";
import getPostsForFeed from "../controllers/posts/getPostsForFeed.js";
import getPostsForExplore from "../controllers/posts/getPostsForExplore.js";
import validateGetUserPost from "../controllers/posts/validators/validateGetUserPosts.js";
import getUserPosts from "../controllers/posts/getUserPosts.js";
import validateGetPostById from "../controllers/posts/validators/validateGetPostById.js";
import getPostById from "../controllers/posts/getPostById.js";
import getMyPosts from "../controllers/posts/getMyPosts.js";

const PostRouter = express.Router();


PostRouter.get("/explore",
    getPostsForExplore
);


// requires authentications
PostRouter.get("/feed",
    isLoggedIn,
    checkUserPresent,
    getPostsForFeed
);

PostRouter.post("/",
    validateCreatePost,
    isLoggedIn,
    checkUserPresent,
    createPost
);
PostRouter.get("/myposts",
    isLoggedIn,
    checkUserPresent,
    getMyPosts
);

PostRouter.patch("/:postId",
    validateUpdatePost,
    isLoggedIn,
    checkUserPresent,
    verifyUserForPost,
    updatePost
);

PostRouter.delete("/:postId",
    validateUpdatePost,
    isLoggedIn,
    checkUserPresent,
    verifyUserForPost,
    deletePost
);



PostRouter.patch("/like/:postId",
    validateLikeDislikePost,
    isLoggedIn,
    likePost
);

PostRouter.patch("/dislike/:postId",
    validateLikeDislikePost,
    isLoggedIn,
    dislikePost
);

PostRouter.patch("/save/:postId",
    validateSavePost,
    isLoggedIn,
    savePost
);


PostRouter.get("/likedposts",
    isLoggedIn,
    checkUserPresent,
    getAllLikedPosts
);

PostRouter.get("/savedposts",
    isLoggedIn,
    getAllSavedPosts
);

PostRouter.get("/all/:id",  // userId
    isLoggedIn,
    validateGetUserPost,
    getUserPosts
);
PostRouter.get("/:postId",
    validateGetPostById,
    getPostById
);



export default PostRouter