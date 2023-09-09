import User from "../../models/User.js";
import { asyncError } from "../../utils/errors/asyncError.js";
import ErrorHandler from "../../utils/errors/errorHandler.js";

const updateProfile = asyncError(async (req, res, next) => {
    const user = req.user;
    
    const updatedUser = await User.findByIdAndUpdate(user._id, req.body, { new: true }).select("-password").exec();
    if (!updatedUser) {
        return next(new ErrorHandler());
    }

    return res.status(200).json({
        msg: "PROFILE_UPDATED_SUCCESFULLY",
        user: updatedUser,
    });
});

export default updateProfile;