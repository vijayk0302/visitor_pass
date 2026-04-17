import { userModel } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import {
  verifyemail,
  welcomemail,
  welcomeemployees,
} from "../services/Emails/emailConfig.js";

export const registeruser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role = "visitor",
      status = "pending",
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        msg: "name email password are required",
      });
    }

    const emailCheck = await userModel.findOne({ email });

    if (emailCheck) {
      return res.status(409).json({
        msg: "User already exists with this email",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const verificationcode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();

    const user = await userModel.create({
      name,
      email,
      password: hash,
      role,
      verificationcode,
    });

    // await verifyemail(user.email, verificationcode)

    res.status(201).json({
      msg: "user is registered successfully",
      user: {
        id: user._id,
        name: user.name,
      },
    });
  } catch (err) {
    return res.status(400).json({
      msg: "Internal Server Error",
      error: err.message,
    });
  }
};

export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        msg: "All feilds required",
      });
    }

    if (role === "admin") {
      const checkadmin = await userModel.findOne({ role: "admin" });
      if (checkadmin) {
        return res.status(409).json({
          msg: "Admin already exists",
        });
      }
    }

    const emailCheck = await userModel.findOne({ email });

    if (emailCheck) {
      return res.status(409).json({
        msg: "User already exists with provided email",
      });
    }

    const hash = await bcrypt.hash(password, 10);
    req.body.password = hash;

    const verificationcode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();

    const user = await userModel.create({
      name,
      email,
      password: hash,
      role,
      verificationcode,
    });

    await verifyemail(user.email, verificationcode);

    res.status(201).json({
      msg: "user is registered successfully",
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        status: user.status,
      },
    });
  } catch (error) {
    return res.status(400).json({
      msg: "Internal Server Error",
      error: error.message,
    });
  }
};

export const verify = async (req, res) => {
  try {
    const { code } = req.body;

    const user = await userModel.findOne({ verificationcode: code });

    if (!user) {
      return res.status(400).json({
        success: false,
        msg: "Invaild or Expired code",
      });
    }
    if (user.role === "visitor") {
      user.status = "active";
    }
    user.isverified = true;
    user.status = "active";
    user.verificationcode = undefined;

    await user.save();

    if (user.role === "visitor") {
      await welcomemail(user.email, user.name);
    }
    res.status(200).json({
      success: true,
      msg: "verification done",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
};

export const loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        msg: "Email and password are required",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ msg: "user not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        msg: "Invalid email or password",
      });
    }
    if (user.status !== "active") {
      return res.status(403).json({
        msg: "Your login is not approved yet",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    res.cookie("token", token,{
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });

    res.status(200).json({
      success: true,
      msg: "User logged in",
      user: {
        name: user.name,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({
      msg: "Something went wrong during login",
    });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
  });

  return res.status(200).json({
    message: "Logged out successfully",
  });
};

export const createuserbyAdmin = async (req, res) => {
  try {
    const { name, email, role } = req.body;

    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(409).json({
        msg: "User already exists with this email",
      });
    }

    const user = await userModel.create({
      ...req.body,
      status: "active",
      isverified: true,
    });

    const token = crypto.randomBytes(32).toString("hex");

    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 3600000;

    await user.save();

    await welcomeemployees(user.email, user.name, user.role, token);

    res.status(201).json({
      msg: "user is registered successfully",
      user,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        msg: "Email already registered",
      });
    }

    res.status(500).json({
      msg: err.message,
    });
  }
};

export const changepassword = async (req, res) => {
  try {
    const userID = req.user.id;
    const { oldpassword, newpassword } = req.body;

    if (!oldpassword || !newpassword) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await userModel.findById(userID);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const ismatch = await bcrypt.compare(oldpassword, user.password);

    if (!ismatch) {
      return res.status(400).json({ message: "Incorrect old password" });
    }

    const hash = await bcrypt.hash(newpassword, 10);
    user.password = hash;
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const setpassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    const user = await userModel.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.json({ message: "Password set successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
