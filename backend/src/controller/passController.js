import { passModel } from "../models/passModel.js";
import { appointmentModel } from "../models/appointmentModel.js";

export const getallpass = async (req, res) => {
  try {
    const { role } = req.user;
    let pass;
    if (role === "admin" || role === "employee") {
      pass = await passModel.find();
    } else {
      return res.status(403).json({ msg: "Forbidden" });
    }
    res.json({ pass });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getpassbyid = async (req, res) => {
  try {
    const { id: userId, role } = req.user;

    const passId = req.params.id;

    let pass;
    if (role === "admin" || role === "employee" || role==='visitor') {
      pass = await passModel.findById(passId);
    } else if (role === "visitor") {
      pass = await passModel.findOne({
        _id: passId,
        "visitor.id": userId,
      });
    } else {
      return res.status(403).json({ msg: "Forbidden" });
    }

    if (!pass) {
      return res.status(404).json({ msg: "Pass not found" });
    }

    const details = await passModel.findById(req.params.id).populate({
      path: "appointment",
      select: "photo purpose",
      populate: {
        path: "visitor",
        select: "name email",
      },
    });

    if (!pass) {
      return res.status(404).json({ msg: "pass not found" });
    }
    res.status(200).json({
      details,
      pass,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getownpass = async (req, res) => {
  try {
    const visitorId =req.params.id
   const appointments = await appointmentModel.find({
      visitor: visitorId
    });
    const passes = await passModel
      .find({
        appointment: { $in: appointments.map(a => a._id) }
      })
      .populate("appointment");

    res.json(passes);

  } catch (err) {
     res.status(500).json({ message: err.message });
  }
};
