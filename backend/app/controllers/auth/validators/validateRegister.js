import { check } from "express-validator";
import validateResult from "../../../middleware/validation/validateResult.js";

/*
 * Validates register request
 */

const validateRegister = [
    check('email')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY')
        .isEmail()
        .withMessage('EMAIL_IS_NOT_VALID')
        .trim(),
    check('name')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY')
        .trim(),
    check('phone')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage("IS_EMPTY")
        .isInt({ min: 1000000000, max: 9999999999 })
        .withMessage('INCORRECT PHONE')
        .trim(),
    check('role')
        .optional()
        .trim(),
    check('username')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY')
        .matches("^\@")
        .withMessage("USERNAME_MUST_STARTS_WITH_@")
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

export default validateRegister;
