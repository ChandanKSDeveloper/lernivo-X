/**
 * ================================================================
 * @file utils/zodErrorFormatter.js
 * @description Utility to format Zod validation errors
 *
 * Zod provides detailed error objects, but they're complex and
 * nested. This utility extracts and formats them into a clean,
 * user-friendly structure.
 * ================================================================
 */

const formatZodError = (error, format = "object") => {
  /**
   * VARIABLE EXPLANATIONS:
   * @variable {ZodError} error - The error object from Zod
   * @variable {string} format - Output format: 'object', 'array', or 'string'
   * @variable {Array} error.issues - Array of validation issue objects
   * @variable {Array} issue.path - Path to the field that failed validation
   * @variable {string} issue.message - The validation error message
   * @variable {Object} formattedErrors - Accumulator for formatted errors
   */
  const formattedErrors = {};
  error.issues.forEach((issue) => {
    const fieldName = issue.path.length > 0 ? issue.path.join(".") : "general";
    formattedErrors[fieldName] = issue.message;
  });
  return formattedErrors;
};

export default formatZodError;
