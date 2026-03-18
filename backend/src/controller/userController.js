import { approvalEmail } from "../middleware/EmailConfig/approvalEmail.js";
import { userModel } from "../models/userModel.js";


export const getalluser = async (req, res) => {
  const user = await userModel.find({
    role: { $ne: "visitor" },
  });

  if (!user) {
    return res.status(400).json({
      msg: "user not found",
    });
  }
  res.status(201).json({
    user,
  });
};

export const getuserbyid = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userModel.findById(id);

    if (!user) {
      return res.status(400).json({
        msg: "user not found",
      });
    }
    res.status(201).json({
      user,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const updateuser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({
        msg: "user not found",
      });
    }

    if (user.status === "active") {
      await approvalEmail(user.email, user.name);
    }

    res.status(200).json({
      msg: "User updated successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const deleteuser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        msg: "user not found",
      });
    }

    res.status(200).json({
      msg: "User deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getVisitor = async (req, res) => {
  try {
    const visitor = await userModel.find({ role: "visitor" });

    if (!visitor) {
      return res.status(400).json({
        msg: "user not found",
      });
    }
    res.status(201).json({
      visitor,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const updatesisitorstatus = async (req, res) => {
  try {
    const visitor = await userModel.findById(req.params.id);

    if (!visitor) {
      return res.status(400).json({
        msg: "user not found",
      });
    }
    visitor.status = visitor.status === "active" ? "pending" : "active";

    await visitor.save();
    res.status(201).json({
      visitor,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getMe = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    res.status(200).json({
      success: true,
      isAuthenticated: true,
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


