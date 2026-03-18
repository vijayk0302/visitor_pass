import { userModel } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { sendverificationcode } from "../middleware/EmailConfig/email.js";
import { welcome } from "../middleware/EmailConfig/welcome.js";
import { welcomeEmployee } from "../middleware/EmailConfig/welcomeEomplyee.js";

export const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role = "employee",
      status = "pending",
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        msg: "All feilds required",
      });
    }

    if (role === "admin") {
      const checkadmin = await userModel.findOne({ role: "admin" });
      if (checkadmin) {
        return res.status(409).json({
          success: false,
          msg: "Admin already exists",
        });
      }
      req.body.status = "active";
    }

    const emailCheck = await userModel.findOne({ email });

    if (emailCheck) {
      return res.status(409).json({
        success: false,
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

    await sendverificationcode(user.email, verificationcode);

    res.status(201).json({
      msg: "user is registered successfully",
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        status: user.status,
      },
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      msg: "Internal Server Error",
      error: err.message,
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
    user.verificationcode = undefined;

    await user.save();

    if (user.role === "visitor") {
      await welcome(user.email, user.name);
    }
    if (user.role !== "visitor") {
      await welcomeEmployee(user.email, user.name);
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

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "Email not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        msg: "Password is incorrect",
      });
    }
    if (user.status !== "active") {
      return res.status(403).json({
        success: false,
        msg: "Your login is not approved by admin",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });

    res.status(201).json({
      success: true,
      msg: "User logged in",
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({
      msg: `Error message ${err.message}`,
    });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

export const createuserbyAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(409).json({
        msg: "User already exists with this email",
      });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      ...req.body,
      status: "active",
      password: hash,
    });

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
    res.status(500).json({ message: "Server error" ,error:error.message});
  }
};
