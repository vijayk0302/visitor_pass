import { appointmentModel } from "../models/appointmentModel.js";
import { userModel } from "../models/userModel.js";
import { uploadFile } from "../services/storage.service.js";
import { passModel } from "../models/passModel.js";
import * as Qr from "qrcode";
import { approvalEmail } from "../middleware/EmailConfig/appointmentmail.js";
import { passEmail } from "../middleware/EmailConfig/passMail.js";
import { reject } from "../middleware/EmailConfig/rejectemail.js";
import { genratePdf } from "../utils/genratePdf.js";

export const createappointment = async (req, res) => {
  try {
    const { phone, idproof, visitDate, purpose } = req.body;

    const visitorId = req.user.id;

    if (!visitorId || !visitDate || !purpose) {
      return res.status(400).json({
        msg: "all feilds are required",
      });
    }

    const visitorExists = await userModel.findById(visitorId);

    if (!visitorExists) {
      return res.status(404).json({
        msg: "Visitor not found",
      });
    }

    let photourl = null;

    if (req.file && req.file.buffer) {
      const fileBase64 = req.file.buffer.toString("base64");
      const result = await uploadFile(fileBase64);
      photourl = result.url;
    }

    const appointment = await appointmentModel.create({
      visitor: visitorId,
      phone,
      photo: photourl,
      idproof,
      visitDate,
      purpose,
      status: "pending",
    });
    await appointment.populate("visitor");

    await approvalEmail(
      appointment.visitor.email,
      appointment.visitor.name,
      appointment.purpose,
    );

    res.status(201).json({
      msg: "Appointment created, awaiting approval",
      appointment,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

export const approveappointment = async (req, res) => {
  try {
    const appointment = await appointmentModel
      .findById(req.params.id)
      .populate("visitor", "name email");

    if (!appointment) {
      return res.status(404).json({
        msg: "Appointment not found",
      });
    }

    if (appointment.status === "approved") {
      return res.status(400).json({ msg: "Already approved" });
    }

    appointment.status = "approved";
    await appointment.save();

    const qrPayload = JSON.stringify({
      appointment: req.params.id,
      issuedAt: Date.now(),
    });

    const qrCode = await Qr.toDataURL(qrPayload);

    if (!qrCode) {
      return res.status(500).json({
        msg: "QR code generation failed",
      });
    }

    const visitdate = new Date(appointment.visitDate);
    const validFrom = new Date(visitdate.setHours(9, 0, 0, 0));
    const validTo = new Date(visitdate.setHours(16, 0, 0, 0));

    const issuer = await userModel.findById(req.user.id).select("name");
    if (!issuer) throw new Error("Issuer not found");

    const pass = await passModel.create({
      appointment: appointment._id,
      qrCode,
      validFrom,
      validTo,
      status: "active",
      issuedBy: {
        id: issuer._id,
        name: issuer.name,
      },
    });

    await pass.populate({
      path: "appointment",
      populate: { path: "visitor", select: "name email" },
    });

    const pdfBuffer = await genratePdf(pass);
    
    await passEmail(appointment.visitor.email, appointment.visitor.name, pdfBuffer);

    res.status(201).json({
      msg: "Appointment approved & Pass issued successfully",
      pass,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

export const getappointment = async (req, res) => {
  try {
    const appointments = await appointmentModel
      .find()
      .populate("visitor", "name email");

    res.status(200).json({
      appointments,
    });
  } catch (err) {
    res.status(500).json({
      msg: err.message,
    });
  }
};

export const getappointmentbyid = async (req, res) => {
  try {
    const appointment = await appointmentModel
      .findById(req.params.id)
      .populate("visitor", "name email phone")
      .populate("host", "name email role");

    if (!appointment) {
      return res.status(404).json({
        msg: "Appointment not found",
      });
    }

    res.status(200).json({
      appointment,
    });
  } catch (err) {
    res.status(500).json({
      msg: err.message,
    });
  }
};

export const rejectappointment = async (req, res) => {
  try {
    const { remark } = req.body;

    if (!remark) {
      return res.status(400).json({ message: "Remark is required" });
    }

    const appointment = await appointmentModel
      .findByIdAndUpdate(
        req.params.id,
        {
          status: "rejected",
          remark: remark,
        },
        { returnDocument: "after" },
      )
      .populate("visitor");

    reject(
      appointment.visitor.email,
      appointment.visitor.name,
      appointment.remark,
    );

    res.status(200).json({
      message: "Appointment rejected with remark",
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Server error",
    });
  }
};
