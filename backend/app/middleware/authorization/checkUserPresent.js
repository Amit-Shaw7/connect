import { asyncError } from "../../utils/errors/asyncError.js";
import ErrorHandler from "../../utils/errors/errorHandler.js";

const checkUserPresent = asyncError(async (req, res, next) => {
    if (!req.user) {
        return next(new ErrorHandler("USER_NOT_FOUND", 404));
    }
    next();
});

export default checkUserPresent;