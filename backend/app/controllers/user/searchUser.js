import User from "../../models/User.js";
import { asyncError } from "../../utils/errors/asyncError.js";

const searchUser = asyncError(async (req, res, next) => {
    const user = req.user;
    const { query } = req.query;

    const users = await User.find({ name: { $regex: query, $options: 'i' } , _id : {$ne : user._id}});
    if (!users) {
        return res.status(200).json({
            msg: "NO_USERS_FOUND",
            users: []
        });
    }

    return res.status(200).json({
        msg: "USERS_FETCHED_SUCCESFULLY",
        users
    });
});

export default searchUser;