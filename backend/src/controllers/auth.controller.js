import { asyncHandler } from "../utils/index.js";
import * as authService from "../services/auth.service.js";
import sendToken from "../utils/jwtToken.js";

export const register = asyncHandler(async (req, res, next) => {
  console.log("📋 register controller is called");

  const user = await authService.register(req);

  sendToken(201, "User created successfully", user, res);
});

export const login = asyncHandler(async (req, res, next) => {
  console.log("📋 Login controller is called");

  const user = await authService.login(req);

  sendToken(200, "Login successful", user, res);
});

export const logout = asyncHandler(async (req, res, next) => {
  console.log("📋 Logout controller is called");

  res
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .status(200)
    .json({
      success: true,
      message: "User logged out successfully",
    });
});

export const getUserProfile = asyncHandler(async (req, res, next) => {

  console.log("👤 User profile controller is called.....");

  console.log(req.user);
  res.status(200).json({
    success: true,
    message: "got the profile",
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    },
  });
});

export const updateProfile = asyncHandler(async (req, res, next) => {
  const user = await authService.updateProfile(req);

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user,
  });
});

export const updatePassword = asyncHandler(async (req, res, next) => {
  const user = await authService.updatePassword(req);

  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
});
