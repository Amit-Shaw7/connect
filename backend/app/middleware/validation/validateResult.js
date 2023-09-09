import { validationResult } from 'express-validator';
import { handleError } from '../../utils/errors/handleError.js';

/**
 * Builds error for validation files
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Object} next - next object
 */
const validateResult = (req, res, next) => {
    try {
        validationResult(req).throw()
        if (req.body.email) {
            req.body.email = req.body.email.toLowerCase()
        }
        return next();
    } catch (error) {
        handleError(error, res, 422, error.array())
    }
}

export default validateResult;
