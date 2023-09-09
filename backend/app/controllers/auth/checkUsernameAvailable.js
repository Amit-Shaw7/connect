import User from "../../models/User.js";
import { asyncError } from "../../utils/errors/asyncError.js";
import ErrorHandler from "../../utils/errors/errorHandler.js";

const checkUsernameAvailable = asyncError(async (req, res, next) => {
    const { username } = req.query;
    const userNameExists = await User.findOne({ username });
    if (userNameExists) {
        return next(new ErrorHandler("USERNAME_ALREADY_TAKEN", 400));
    }

    return res.status(200).json({
        msg: "USERNAME_AVALIABLE"
    });
})
export default checkUsernameAvailable;