import bcryptjs from "bcryptjs";
import { asyncError } from "../../../utils/errors/asyncError.js";

export const comparePassword = asyncError(async (enteredPassword, userPassword) => {
    const verifiedPassword = await bcryptjs.compare(enteredPassword, userPassword);
    if (verifiedPassword) {
        return verifiedPassword;
    } else {
        return false;
    }
});