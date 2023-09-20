import express from "express";
import { isLoggedIn } from "../middleware/authorization/isLoggedIn.js";
import validateUpdateProfile from "../controllers/user/validators/validateUpdateProfile.js";
import updateProfile from "../controllers/user/updateProfile.js";
import checkUserPresent from "../middleware/authorization/checkUserPresent.js";
import validateFollowUnfollowUser from "../controllers/user/validators/validateFollowUnfollowUser.js";
import searchUser from "../controllers/user/searchUser.js";
import getFollowers from "../controllers/user/getFollowers.js";
import getFollowings from "../controllers/user/getFollowings.js";
import findSuggestedUsers from "../controllers/user/findSuggestedUsers.js";
import validateGetUser from "../controllers/user/validators/validateGetUser.js";
import getUser from "../controllers/user/getUser.js";
import validateGetFollowersFollowings from "../controllers/user/validators/validateGetFollowersFollowing.js";
import verifyUserForProfile from "../middleware/authorization/verifyUserForProfile.js";
import getProfile from "../controllers/user/getProfile.js";
import followUnfollowUser from "../controllers/user/followUnfollowUser.js";

const UserRouter = express.Router();


// Authentication required 
UserRouter.get("/search",
    isLoggedIn,
    checkUserPresent,
    searchUser
);

UserRouter.get("/profile",
    isLoggedIn,
    checkUserPresent,
    getProfile
);

UserRouter.patch("/profile",
    validateUpdateProfile,
    isLoggedIn,
    checkUserPresent,
    updateProfile
);

UserRouter.get("/suggesteduser",
    isLoggedIn,
    checkUserPresent,
    findSuggestedUsers
);

UserRouter.get("/:id",
    validateGetUser,
    isLoggedIn,
    checkUserPresent,
    getUser
);

UserRouter.get("/followers/:id",
    validateGetFollowersFollowings,
    isLoggedIn,
    checkUserPresent,
    getFollowers
);

UserRouter.get("/followings/:id",
    validateGetFollowersFollowings,
    isLoggedIn,
    checkUserPresent,
    getFollowings
);

UserRouter.patch("/followUnfollow/:id",
    validateFollowUnfollowUser,
    isLoggedIn,
    checkUserPresent,
    followUnfollowUser
);


export default UserRouter;