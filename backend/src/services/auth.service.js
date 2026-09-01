import { ZodError } from "zod";
import User from "../models/user.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import {
  loginUserSchema,
  registerUserSchema,
  updateProfileSchema,
  changePasswordSchema,
} from "../validators/auth.validator.js";
import formatZodError from "../utils/zodErrorFormatter.js";

export const register = async (req) => {
  try {
    const validatedData = registerUserSchema.parse(req.body);
    console.log("✅ Data validation successful");

    const { name, email, password } = validatedData;

    console.log(`🔍 Checking if email ${email} is already registered`);
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.warn(`⚠️ Email ${email} is already registered`);
      throw new ErrorHandler(400, `Email already registered`, {
        email: "This email is already registered",
      });
    }

    console.log(`👤 Creating new user: ${email}`);
    const user = await User.create({
      name,
      email,
      password,
    });
    console.log(`✅ User created successfully with ID: ${user._id}`);

    return user;
  } catch (error) {
    if (error instanceof ZodError) {
      const formattedErrors = formatZodError(error);
      throw new ErrorHandler(400, "Validation Failed", formattedErrors);
    }

    throw error;
  }
};

export const login = async (req) => {
  try {
    const validatedData = loginUserSchema.parse(req.body);

    const { email, password } = validatedData;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      console.warn(`⚠️ Email not found registered`);
      throw new ErrorHandler(
        400,
        `This Email is not registered, create an Account`,
        {
          email: "This email is not registered",
        },
      );
    }

    const matchPassword = await user.comparePassword(password);
    if (!matchPassword) {
      console.warn(`⚠️ Invalid Credentials. Password not matched`);
      throw new ErrorHandler(401, "Invalid Credentials");
    }

    return user;
  } catch (error) {
    if (error instanceof ZodError) {
      const formattedErrors = formatZodError(error);
      throw new ErrorHandler(400, "Validation Failed", formattedErrors);
    }

    throw error;
  }
};


export const updateProfile = async (req) => {
  try {
    const validatedData = updateProfileSchema.parse(req.body);
    console.log("✅ Data validation successful");

    const allowedFields = ["name"];
    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined ) {
        updates[field] = req.body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return new ErrorHandler(400, "No valid fields to update");
    }

    const user = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
    });

    return user;
  } catch (error) {
    if (error instanceof ZodError) {
      const formattedErrors = formatZodError(error);
      throw new ErrorHandler(400, "Validation Failed", formattedErrors);
    }

    throw error;
  }
};

export const updatePassword = async (req) => {
  try {
    const { currentPassword, newPassword } = changePasswordSchema.parse(req.body);


    const user = await User.findById(req.user._id).select("+password");

    if (!user) {
      throw new ErrorHandler(404, "User not found");
    }

    const isPasswordValid = await user.comparePassword(currentPassword);
    if (!isPasswordValid) {
      throw new ErrorHandler(401, "Current password is incorrect");
    }

    user.password = newPassword;
    await user.save();

    return user;
  } catch (error) {
    if (error instanceof ZodError) {
      const formattedErrors = formatZodError(error);
      throw new ErrorHandler(400, "Validation Failed", formattedErrors);
    }

    throw error;
  }
};
