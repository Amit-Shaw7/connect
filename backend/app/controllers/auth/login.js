import User from "../../models/User.js";
import { asyncError } from "../../utils/errors/asyncError.js";
import ErrorHandler from "../../utils/errors/errorHandler.js";
import { comparePassword } from "./helpers/comparePassword.js";
import { generateToken } from "./helpers/generateToken.js";
import { setCookie } from "./helpers/setCookie.js";

const login = asyncError(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return next(new ErrorHandler("INVALID_EMAIL_OR_PASSWORD", 400));
    }

    const verified = await comparePassword(password, user.password);
    if (!verified) {
        return next(new ErrorHandler("INVALID_EMAIL_OR_PASSWORD", 400));
    }

    const token = await generateToken(user?._id);
    const { password: pass, ...rest } = user._doc;
    setCookie(res, token);
    return res.status(200).json({
        msg: "LOGGED_IN_SUCCESFULLY",
        user: rest,
        token
    });
});

export default login;