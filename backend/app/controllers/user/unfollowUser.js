import User from "../../models/User.js";
import { asyncError } from "../../utils/errors/asyncError.js";
import ErrorHandler from "../../utils/errors/errorHandler.js";

const unfollowUser = asyncError(async (req, res, next) => {
    const user = req.user;
    const unfollowUserId = req.params.id;

    const userToBeUnfollowed = await User.findById(unfollowUserId);
    if (!userToBeUnfollowed) {
        return next(new ErrorHandler("USER_NOT_FOUND", 404));
    }

    userToBeUnfollowed.followers = userToBeUnfollowed.followers.filter(id => !id.equals(user._id));
    user.followings = user.followings.filter(id => !id.equals(userToBeUnfollowed?._id));

    await user.save();
    await userToBeUnfollowed.save();

    return res.status(200).json({
        msg: "USER_UNFOLLOWED_SUCCESFULLY",
    });
});

export default unfollowUser;