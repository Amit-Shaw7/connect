import { check } from "express-validator";
import validateResult from "../../../middleware/validation/validateResult.js";


/**
 * Validates update profile request
 */

const validateUpdateProfile = [
    check('email')
        .optional()
        .isEmail()
        .withMessage('EMAIL_IS_NOT_VALID')
        .trim(),
    check('name')
        .optional()
        .trim(),
    check('phone')
        .optional()
        .isInt({ min: 1000000000, max: 9999999999 })
        .withMessage('INCORRECT PHONE')
        .trim(),
    (req, res, next) => {
        validateResult(req, res, next);
    }
]

export default validateUpdateProfile;
