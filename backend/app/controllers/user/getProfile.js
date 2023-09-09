import User from "../../models/User.js";
import { asyncError } from "../../utils/errors/asyncError.js";
import ErrorHandler from "../../utils/errors/errorHandler.js";

const getProfile = asyncError(async (req, res, next) => {
    const user = req.user;

    return res.status(200).json({
        msg: "PROFILE_FETCHED_SUCCESFULLY",
        user
    });
});

export default getProfile;