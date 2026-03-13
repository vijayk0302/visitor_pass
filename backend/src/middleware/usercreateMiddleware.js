import { userModel } from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const usercreation = async (req, res, next) => {
  try {
    const { name, email, password, role = "employee",status='pending' } = req.body;

    if (role === "admin") {
      const checkadmin = await userModel.findOne({ role: "admin" });
      if (checkadmin) {
        return res.status(409).json({
          msg: "Admin already exists",
        });
      }
      req.body.status='active';
    }

    const emailCheck = await userModel.findOne({ email });
    if (emailCheck) {
      return res.status(409).json({
        msg: "User already exists with provided email",
      });
    }

    const hash = await bcrypt.hash(password, 10);
    req.body.password=hash;
    

    next();
  } catch (err) {
    res.status(500).json({
      msg: err.message,
    });
  }
};


