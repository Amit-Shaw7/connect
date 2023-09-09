import { check } from "express-validator";
import validateResult from "../../../middleware/validation/validateResult.js";


/**
 * Validates update profile request
 */

const validateCreatePost = [
    check('postText')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY')
        .trim(),
    check('media')
        .optional()
        .trim(),
    (req, res, next) => {
        validateResult(req, res, next);
    }
]

export default validateCreatePost;
