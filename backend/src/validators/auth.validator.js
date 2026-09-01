/**
 ================================================================
 * @file validators/userValidator.js
 * @description User registration validation schema using Zod
 * 
 * This defines the validation rules for user registration data.
 * Zod ensures that incoming data meets specific criteria before
 * it reaches the database.
 * ================================================================
 */

import z from "zod";

const passwordRule = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

const passwordMessage = "Password must be at least 8 characters with one uppercase, one lowercase, one number, and one special character";

export const registerUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be atleast 3 characters long")
    .max(100, "Name must be no more than 100 characters"),

  email: z
    .email("Invalid Email Format")
    .trim()
    .max(100, "email must be no more than 100 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(passwordRule, passwordMessage),
});


export const loginUserSchema = z.object({
   email: z
    .email("Invalid Email Format")
    .trim()
    .max(100, "email must be no more than 100 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(passwordRule, passwordMessage),
})

export const updateProfileSchema = z.object({
   name: z
    .string()
    .trim()
    .min(3, "Name must be atleast 3 characters long")
    .max(100, "Name must be no more than 100 characters"),

})

export const changePasswordSchema =  z.object({

  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(passwordRule, passwordMessage),
})