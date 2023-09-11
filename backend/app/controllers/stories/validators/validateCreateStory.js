import { check } from "express-validator";
import validateResult from "../../../middleware/validation/validateResult.js";


/**
 * Validates update profile request
 */

const validateCreateStory = [
    check('media')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY')
        .trim(),
    check('text')
        .optional()
        .trim(),
    check('color')
        .optional()
        .trim(),
    (req, res, next) => {
        validateResult(req, res, next);
    }
]

export default validateCreateStory;
