import Post from "../../models/Post.js";
import { asyncError } from "../../utils/errors/asyncError.js";
import ErrorHandler from "../../utils/errors/errorHandler.js";

const verifyUserForProfile = asyncError(async (req, res, next) => {
    const user = req.user;
    const userId = req.params.id;
    
    if(!user._id.equals(userId)){
        return next(new ErrorHandler("NOT_PERMITTED" , 404));
    }
    
    next();
});

export default verifyUserForProfile;