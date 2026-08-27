/**
 * ==============================================================================
 * @file asyncHandler.js
 * @description Async Handler Utility - Express.js error wrapper
 * 
 * A wrapper that eliminates the need for repetitive try-catch blocks in 
 * controller functions. It passes any caught errors to the next middleware.
 * 
 * 
 * @param {Function} anyPassedFunction - The async controller function 
 *                                       to be wrapped. This function 
 *                                       typically receives (req, res, next).
 * 
 * 
 * @returns {Function} - Returns a new function that Express can call 
 *                       with (req, res, next). This returned function 
 *                       resolves the passed function and catches errors.
 */


const asyncHandler = (anyPassedFunction) => (req, res, next) => {
    Promise
        .resolve(anyPassedFunction(req, res))
        .catch(next);
}


export default asyncHandler;