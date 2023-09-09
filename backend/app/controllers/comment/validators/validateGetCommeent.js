import { check } from "express-validator";
import validateResult from "../../../middleware/validation/validateResult.js";


/**
 * Validates get all comment request
 */

const validateGetComment = [
    check('id') // comment id
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

export default validateGetComment;
