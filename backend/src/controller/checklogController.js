import { checklogModel } from "../models/checklogModel.js";
import { passModel } from "../models/passModel.js";

export const scanvisitor = async (req, res) => {
  try {
    const data = JSON.parse(req.params.id);
    const pass = await passModel.findOne({ appointment: data.appointment });

    if (!pass) {
      return res.status(404).json({ msg: "Invalid pass" });
    }

    const currentdate = new Date();

    if (currentdate < pass.validFrom || currentdate > pass.validTo) {
      return res.status(403).json({ msg: "Pass not valid" });
    }

    if (pass.status === "expired") {
      return res.status(400).json({
        msg: "Pass already expired",
      });
    }

    const log = await checklogModel.findOne({
      pass: pass._id,
    });

    if (!log && pass.status === "active") {
      const newLog = await checklogModel.create({
        pass: pass._id,
        checkedInBy: req.user.id,
        checkOutTime: null,
      });

      await pass.populate({
        path: "appointment",
        select: "visitDate",
        populate: {
          path: "visitor",
          select: "name",
        },
      });

      const username = pass.appointment.visitor.name;
      const date = pass.appointment.visitDate;

      pass.status = "used";
      await pass.save();

      return res.json({
        msg: "Visitor checked in",
        log: newLog,
        username,
        date,
      });
    }

    if (log && pass.status === "used") {
      log.checkOutTime = new Date();
      await log.save();

      pass.status = "expired";
      await pass.save();

      return res.json({
        msg: "Visitor checked out",
        log,
      });
    }

    return res.status(400).json({
      msg: "Invalid scan state",
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getallchecklog = async (req, res) => {
  const checklog = await checklogModel.find().populate("checkedInBy", "name");

  res.status(200).json({
    msg: "Visitor checked out successfully",
    checklog,
  });
};
