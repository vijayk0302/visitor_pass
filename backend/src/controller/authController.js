import { userModel } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import {
  verifyemail,
  welcomemail,
  welcomeemployees,
} from "../services/Emails/emailConfig.js";

const pswdCheck = (password) => {
  if (password.length < 6) {
    return {
      success: false,
      msg: "password too short atleast use 6 characters",
    };
  }
  // for checkeing atleat one number present in password
  let hasNumber = false;
  for (let i = 0; i < password.length; i++) {
    if (!isNaN(password[i])) {
      hasNumber = true;
      break;
    }
  }
  if (!hasNumber) {
    return { success: false, msg: "Password must contain a number" };
  }

  // to check password has special character
  let haschar = false;
  const splchar = "!@#$&_";

  for (let i = 0; i < splchar.length; i++) {
    if (password.includes(splchar[i])) {
      haschar = true;
      break;
    }
  }

  if (!haschar) {
    return { success: false, msg: "Password must contain a special character" };
  }
  return { success: true };
};

const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// api for creating a new user in database
export const registerNewUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // basic input validation to get value not empty
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        msg: "Name, email and password are required",
      });
    }

    // checking if user already exists if it exists return
    const checkUser = await userModel.findOne({ email });
    if (checkUser) {
      return res.status(409).json({
        success: false,
        msg: "User already exists with this email",
      });
    }

    // password validation for strength of passowrd before hash password
    const chckdPwd = pswdCheck(password);
    if (!chckdPwd.success) {
      return res.status(400).json(chckdPwd);
    }

    // hashing password becouse if data leaks or hacker attack it get wrong data not real data
    const hash = await bcrypt.hash(password, 10);

    // generate verification code
    const code = generateVerificationCode();

    // user created in mongodb server
    const user = await userModel.create({
      name,
      email,
      password: hash,
      role: role,
      isverified: false,
      verificationcode: code,
    });

    //sending a email for verify email
    await verifyemail(user.email, code);

    res.status(201).json({
      success: true,
      msg: "user registered successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      msg: err.message || "Server error during registration",
    });
  }
};

// api for register a user as admin himself
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // basic input validation to get value not empty
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        msg: "Name, email and password are required",
      });
    }
    const checkUser = await userModel.findOne({ email });

    if (checkUser) {
      return res.status(409).json({
        success: false,
        msg: "User already exists with this email",
      });
    }

    const chckdPwd = pswdCheck(password);
    if (!chckdPwd.success) {
      return res.status(400).json(chckdPwd);
    }

    const hash = await bcrypt.hash(password, 10);

    const code = generateVerificationCode();

    const user = await userModel.create({
      name,
      email,
      password: hash,
      role,
      verificationcode: code,
    });

    await verifyemail(user.email, code);

    res.status(201).json({
      success: true,
      msg: "user is as Admin successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      msg: err.message || "failed",
    });
  }
};

//  api for verify email to check email exists or not
export const verify = async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        msg: "Verification code is required",
      });
    }

    //finding user with verfication code
    const userWithCode = await userModel.findOne({ verificationcode: code });

    // code and user not found returning invalid code
    if (!userWithCode) {
      return res.status(400).json({
        success: false,
        msg: "Invaild or Expired code",
      });
    }

    // updateing status for user can login
    userWithCode.isverified = true;
    userWithCode.status = "active";
    userWithCode.verificationcode = null;

    await userWithCode.save();

    if (userWithCode.role === "visitor") {
      await welcomemail(userWithCode.email, userWithCode.name);
    }
    res.status(200).json({
      success: true,
      msg: "Account verified",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      msg: err.message || "some internal error can't verify account right now",
    });
  }
};

//api for login
export const loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        msg: "Email and password are required",
      });
    }

    // checking user with email exists or not
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        msg: "Invalid email or password",
      });
    }

    // matcing passowrd
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res
        .status(401)
        .json({ success: false, msg: "Invalid email or password" });
    }

    const secret = process.env.JWT_SECRET || "env fails";
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, secret, {
      expiresIn: "24h",
    });

    // create jwt token
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, 
      sameSite: "None",
    });

    return res.json({
      success: true,
      msg: "Logged in",
      user: {
        name: user.name,
        role: user.role,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      msg: err.message || "Login failed",
    });
  }
};

// api logout
export const logout = (req, res) => {
  res.clearCookie("token");
  return res.json({ success: true, msg: "Logged out" });
};

export const createuserbyAdmin = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(409).json({
        success: false,
        msg: "User already exists with this email",
      });
    }
    const user = await userModel.create({
      name,
      email,
      password: "",
      role,
      isverified: true,
    });

    // generate reset token
    const token = crypto.randomBytes(32).toString("hex");
    user.resetToken = token;
    await user.save();

    await welcomeemployees(user.email, user.name, user.role, token);

    res.status(201).json({
      success: true,
      msg: "user is registered successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      msg: err.message || "Something went wrong",
    });
  }
};

// api for new employee create his passowrd
export const changepassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await userModel.findById(req.user.id);
    // check old password
    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) {
      return res
        .status(401)
        .json({ success: false, msg: "incorrect old password" });
    }

    // prevent same password
    const newOldMatch = await bcrypt.compare(newPassword, user.password);
    if (newOldMatch) {
      return res.status(400).json({
        success: false,
        msg: "Old password and new password can not be same",
      });
    }

    const chckdPwd = pswdCheck(newPassword);
    if (!chckdPwd.success) {
      return res.status(400).json(chckdPwd);
    }

    const hash = await bcrypt.hash(newPassword, 10);
    user.password = hash;
    await user.save();

    res.status(201).json({ success: true, msg: "Password updated" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      msg: err.message || "technical procblem occurs try again later",
    });
  }
};

export const setpassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    const user = await userModel.findOne({
      resetToken: token,
    });

    if (!user) {
      return res.status(400).json({ msg: "Invalid or expired token" });
    }

    const chckdPwd = pswdCheck(password);
    if (!chckdPwd.success) {
      return res.status(400).json(chckdPwd);
    }

    const hash = await bcrypt.hash(password, 10);

    user.password = hash;
    user.resetToken = undefined;
    await user.save();

    res.status(201).json({ success: true, msg: "Password created" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      msg: err.message || "can not connect with server try again",
    });
  }
};
