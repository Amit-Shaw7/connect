import { check } from "express-validator";
import validateResult from "../../../middleware/validation/validateResult.js";

/**
 * Validates like and dislike post request
 */

const validateSavePost = [
    check('postId')
        .exists()
        .withMessage("MISSING")
        .not()
        .isEmpty()
        .withMessage("IS_EMPTY")
        .trim(),
    (req, res, next) => {
        validateResult(req, res, next);
    }
]

export default validateSavePost;
