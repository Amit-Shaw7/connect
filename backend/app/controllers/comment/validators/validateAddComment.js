import { check } from "express-validator";
import validateResult from "../../../middleware/validation/validateResult.js";


/**
 * Validates add comment request
 */

const validateAddComment = [
    check('text')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY')
        .trim(),
    check('id') // post id
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

export default validateAddComment;
