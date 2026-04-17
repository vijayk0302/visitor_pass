import { appointmentModel } from "../models/appointmentModel.js";
import { userModel } from "../models/userModel.js";
import { uploadFile } from "../services/storage.service.js";
import { passModel } from "../models/passModel.js";
import * as Qr from "qrcode";
import { generatePdf } from "../utils/genratePdf.js";
import {
  appointmentsubmit,
  passcreated,
  reject,
} from "../services/Emails/emailConfig.js";

export const createappointment = async (req, res) => {
  try {
    const { phone, idproof, visitDate, purpose } = req.body;

    const visitorId = req.user.id;

    if (!visitorId) {
      return res.status(400).json({
        msg: "Visitor id not found",
      });
    }

    const visitorExists = await userModel.findById(visitorId);

    if (!visitorExists) {
      return res.status(404).json({
        msg: "Visitor not found",
      });
    }

    let photourl = "";

    if (req.file) {
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

    await appointmentsubmit(
      appointment.visitor.email,
      appointment.visitor.name,
      appointment.purpose,
    );

    res.status(201).json({
      msg: "appointment created",
      appointment: appointment,
    });
  } catch (err) {
    return res.status(500).json({
      msg: "error creating appointment",
    });
  }
};

export const approveappointment = async (req, res) => {
  try {
    const id = req.params.id;

    const appointment = await appointmentModel.findById(id).populate("visitor");

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
      time: Date.now(),
    });

    const qrCode = await Qr.toDataURL(qrPayload);

    const visitdate = new Date(appointment.visitDate);

    const validFrom = new Date(visitdate);
    validFrom.setHours(9, 0, 0);

    const validTo = new Date(visitdate);
    validTo.setHours(16, 0, 0);

    const issuer = await userModel.findById(req.user.id);
    
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

    const pdfBuffer = await generatePdf(pass);

    await passcreated(
      appointment.visitor.email,
      appointment.visitor.name,
      pdfBuffer,
    );

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

    await reject(
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
