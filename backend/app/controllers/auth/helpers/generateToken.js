import jwt from "jsonwebtoken";
import { asyncError } from "../../../utils/errors/asyncError.js";

export const generateToken = asyncError(async (id) => {
    const SECRET = process.env.JWT_SECRET_KEY
    const token = await jwt.sign({ id }, SECRET , {expiresIn:"168h"});
    if (token) {
        return token;
    }
});