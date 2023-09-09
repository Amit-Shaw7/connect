import { check } from "express-validator";
import validateResult from "../../../middleware/validation/validateResult.js";


/**
 * Validates update profile request
 */

const validateFollowUnfollowUser = [
    check('id') // user to be followed
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY')
        .trim(),
    (req, res, next) => {
        validateResult(req, res, next);
    }
]

export default validateFollowUnfollowUser;
