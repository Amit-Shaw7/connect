import User from "../../models/User.js";
import { asyncError } from "../../utils/errors/asyncError.js";
import ErrorHandler from "../../utils/errors/errorHandler.js";

const followUser = asyncError(async (req, res, next) => {
    const user = req.user;
    const followUserId = req.params.id;

    const userToBeFollowed = await User.findById(followUserId);
    if (!userToBeFollowed) {
        return next(new ErrorHandler("USER_NOT_FOUND", 404));
    }

    userToBeFollowed.followers.push(user._id);
    user.followings.push(userToBeFollowed._id);

    await user.save();
    await userToBeFollowed.save();

    return res.status(200).json({
        msg: "USER_FOLLOWED_SUCCESFULLY",
    });
});

export default followUser;