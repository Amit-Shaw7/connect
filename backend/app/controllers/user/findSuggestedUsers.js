import { asyncError } from "../../utils/errors/asyncError.js";
import User from "../../models/User.js";

const findSuggestedUsers = asyncError(async (req, res, next) => {
    const user = req.user;
    let suggestedUsers = [];

    const popularUsers = await User.find({ _id: { $ne: user._id } }).sort({ follower: 1 }).limit(5);
    suggestedUsers = [...suggestedUsers, ...popularUsers];

    const userIFollow = await User.find({ followers: { $in: user._id }, _id: { $ne: user._id } });
    suggestedUsers = [...suggestedUsers, ...userIFollow];

    const userFollowsMe = await User.find({ followings: { $in: user._id }, _id: { $ne: user._id } });
    suggestedUsers = [...suggestedUsers, ...userFollowsMe];

    const unique = suggestedUsers.filter((obj, index) => {
        return index === suggestedUsers.findIndex(o => obj._id.equals(o.id));
    });

    return res.status(200).json({
        msg: "SUGGESTED_USERS_FETCHED_SUCCESFULLY",
        users: unique
    });
});

export default findSuggestedUsers;