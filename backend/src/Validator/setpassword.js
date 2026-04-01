import { body } from "express-validator";

export const setpasswordvalidator = [
  
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .matches(/[a-z]/)
    .withMessage("Must include lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Must include uppercase letter")
    .matches(/\d/)
    .withMessage("Must include a number")
    .matches(/[@$!%*?&]/)
    .withMessage("Must include a special character"),
];
