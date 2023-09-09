import { check } from "express-validator";
import validateResult from "../../../middleware/validation/validateResult.js";


/**
 * Validates like dislike comment request
 */

const validateUpdateComment = [
    check('id') // comment id id
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY')
        .trim(),
    check('text') // comment id id
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

export default validateUpdateComment;
