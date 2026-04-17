import { checklogModel } from "../models/checklogModel.js";
import { passModel } from "../models/passModel.js";

export const scanvisitor = async (req, res) => {
  try {
    const data = JSON.parse(req.params.id);
    const pass = await passModel.findOne({ appointment: data.appointment });

    if (!pass) {
      return res.status(404).json({ msg: "Invalid pass" });
    }

    const now = new Date();

    if (now < pass.validFrom || now > pass.validTo) {
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

    if (!log ) {
      const newLog = await checklogModel.create({
        pass: pass._id,
        checkedInBy: req.user.id,
        checkOutTime: null,
      });
      pass.status = "used";
      await pass.save();

      return res.json({
        msg: "Visitor checked in",
        log: newLog,
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

  } catch (err) {
    res.status(500).json({ msg: "scan error" });
  }
};

export const getallchecklog = async (req, res) => {
  const checklog = await checklogModel.find().populate("checkedInBy", "name");

  res.status(200).json({
    msg: "Visitor checked out successfully",
    checklog,
  });
};
