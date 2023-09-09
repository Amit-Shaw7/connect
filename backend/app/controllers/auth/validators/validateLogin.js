import { check } from "express-validator";
import validateResult from "../../../middleware/validation/validateResult.js";

/**
 * Validates register request
 */

const validateLogin = [
    check('email')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY')
        .isEmail()
        .withMessage('EMAIL_IS_NOT_VALID')
        .trim(),
    check('password')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY')
        .isLength({
            min: 5
        })
        .withMessage('PASSWORD_TOO_SHORT_MIN_5')
        .trim(),
    (req, res, next) => {
        validateResult(req, res, next);
    }
]

export default validateLogin;
