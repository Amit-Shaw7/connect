import User from "../../models/User.js";
import { asyncError } from "../../utils/errors/asyncError.js";
import ErrorHandler from "../../utils/errors/errorHandler.js";

const getUser = asyncError(async (req, res, next) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if(!user){
        return next(new ErrorHandler("USER_NOT_FOUND" , 404));
    }

    return res.status(200).json({
        msg: "USER_FETCHED_SUCCESFULLY",
        user
    });
});

export default getUser;