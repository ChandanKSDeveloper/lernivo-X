/**
 * Authentication and Authorization Middleware
 * @module middlewares/auth
 */

import { asyncHandler, ErrorHandler } from "../utils/index.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

/**
 * Authentication middleware -> verifies if a user is authenticated or not
 *
 *
 *  @description
 * This middleware checks for a valid JWT token in either:
 * - HTTP-only cookie (preferred method)
 * - Authorization header (Bearer token)
 */
export const isAuthenticatedUser = asyncHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;
  console.log("token : ", token);

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.substring(7);
  }

  // fallback to cookies -> if auth header does not work

  if (!token) {
    token = req.cookies?.token;
  }

  console.log("Authentication token:", token);

  if (!token) {
    throw new ErrorHandler(401, "Please login to access this resource");
  }

  let decoded;

  try {
    console.log("decoding token...");
    decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded token : ", decoded);
  } catch (error) {
    console.log("JWT Error:", error);

    if (error.name === "TokenExpiredError") {
      throw new ErrorHandler(401, "Token expired. Please login again");
    }

    if (error.name === "JsonWebTokenError") {
      throw new ErrorHandler(401, "Invalid token. Please login again");
    }

    throw error;
  }

  const user = await User.findById(decoded.id);

  if (!user) {
    throw new ErrorHandler(401, "User not found. Please login again");
  }

  req.user = user;
  req.token = token;
  req.userID = user._id;

  next();
});

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(
        new ErrorHandler(401, "Please login first to authorize role"),
      );
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          403,
          `Role: ${req.user.role} is not allowed to access this resource`,
        ),
      );
    }

    next();
  };
};
