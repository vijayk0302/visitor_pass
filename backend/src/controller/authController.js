import { userModel } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
  const user = await userModel.create(req.body);

  res.status(201).json({
    msg: "user is registered successfully",
    user: {
      id: user._id,
      name: user.name,
      role: user.role,
      status: user.status,
    },
  });
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        msg: "Email not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        msg: "Password is incorrect",
      });
    }
    if (user.status !== "active") {
      return res.status(403).json({
        msg: "This User is not approved by admin",
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
      sameSite: "strict",
    });

    res.status(201).json({
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
    const user = await userModel.create( {...req.body,status:'active',password:hash} );
    
    res.status(201).json({
      msg: "user is registered successfully",
      user
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


