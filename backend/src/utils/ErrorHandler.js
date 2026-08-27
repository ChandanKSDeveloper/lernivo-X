/**
 * @file ErrorHandler.js
 * @description Custom Error Handler Class - Standardized Error Creation
 *
 * WHAT IT DOES :
 *  This class extends the native JavaScript Error class to add
 *  an HTTP statusCode property. This allows controllers to throw
 *  structured errors that can be caught by asyncHandler and
 *  properly formatted by the global error handler.
 */

/**
 * @class ErrorHandler
 * @extends Error
 * @description Custom error class extends native Error with
 *              HTTP status code support for Express.js applications
 */

class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.timestamp = new Date().toISOString();
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorHandler;
