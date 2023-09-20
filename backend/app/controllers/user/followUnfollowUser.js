import User from "../../models/User.js";
import { asyncError } from "../../utils/errors/asyncError.js";
import ErrorHandler from "../../utils/errors/errorHandler.js";

const followUnfollowUser = asyncError(async (req, res, next) => {
    const user = req.user;
    const friendId = req.params.id;
    let followed = false;

    const friend = await User.findById(friendId);
    if (!friend) {
        return next(new ErrorHandler("USER_NOT_FOUND", 404));
    }

    if (user.followings.includes(friendId)) {
        // Unfollow
        friend.followers = friend.followers.filter((id) => !id.equals(user?._id));
        user.followings = user.followings.filter((id) => !friend._id.equals(id));
        followed = false;
    } else {
        // follow
        friend.followers.push(user._id);
        user.followings.push(friend._id);
        followed = true;
    }

    await user.save();
    await friend.save();

    return res.status(200).json({
        msg: "USER_FOLLOWED_SUCCESFULLY",
        followed
    });
});

export default followUnfollowUser;