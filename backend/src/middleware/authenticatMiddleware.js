import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel.js";

export const authenticate = async (req, res, next) => {
  const token = req.cookies.token;
  
  try {
    if (!token || token === undefined) {
      return res.status(401).json({ msg: "Authentication required" });
    }
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not configured");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
  
    next();
  } catch (err) {
    let message = "Invalid token";

    if (err.name === "TokenExpiredError") {
      message = "Token expired. Please login again.";
    }

    return res.status(401).json({
      success: false,
      message,
    });
  }
};
