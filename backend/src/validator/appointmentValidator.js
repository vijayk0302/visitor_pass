import {body} from "express-validator";

export const createAppointmentValidator = [
  body("phone").notEmpty().withMessage("Phone is required"),
  body("idproof").notEmpty().withMessage("ID proof is required"),
  body("purpose")
    .notEmpty()
    .withMessage("Purpose is required")
    .isLength({ min: 3 })
    .withMessage("Purpose must be at least 3 characters"),
  body("visitDate").notEmpty().withMessage("Visit date is required"),
];
