import jwt from "jsonwebtoken";
import { asyncError } from "../../utils/errors/asyncError.js";
import User from "../../models/User.js";
import ErrorHandler from "../../utils/errors/errorHandler.js";

export const isLoggedIn = asyncError(async (req, res, next) => {
    const PRIVATE_KEY = process.env.JWT_SECRET_KEY;

    const token = req.cookies["connectToken"];
    if (!token) {
        return next(new ErrorHandler("UNAUTHORIZED", 401));
    }

    const verified = jwt.verify(token, PRIVATE_KEY);
    if (!verified) {
        return next(new ErrorHandler("UNAUTHORIZED", 401));
    }

    const user = await User.findById(verified?.id).select("-password");
    if (!user) {
        return next(new ErrorHandler("USER_NOT_FOUND", 404));
    }
    req.user = user;
    next();
});