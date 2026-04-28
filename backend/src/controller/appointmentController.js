import { appointmentModel } from "../models/appointmentModel.js";
import { userModel } from "../models/userModel.js";
import { uploadFile } from "../services/storage.service.js";
import { passModel } from "../models/passModel.js";
import * as Qr from "qrcode";
import { generatePdf } from "../utils/generatePdf.js";
import {appointmentsubmit,passcreated,reject,} from "../services/Emails/emailConfig.js";

// api for creating new appointment request from visitor
export const createappointment = async (req, res) => {
  try {
    const { phone, idproof, visitDate, purpose } = req.body;

    // Check if required fields are there
    if (!phone || !idproof || !visitDate || !purpose) {
      return res.status(400).json({ msg: "Please fill all fields" });
    }

    const visitorId = req.user.id;
    const findvisitor = await userModel.findById(visitorId);

    if (!findvisitor) {
      return res.status(404).json({
        success: false,
        msg: "User not found in system",
      });
    }

    let photourl = "";
    if (req.file) {
      // Convert image to base64 for upload
      const imgBase64 = req.file.buffer.toString("base64");
      const uploadResult = await uploadFile(imgBase64);
      photourl = uploadResult.url;
    }
    // creating appointment in database
    const appointment = await appointmentModel.create({
      visitor: visitorId,
      phone,
      photo: photourl,
      idproof,
      visitDate,
      purpose,
      status: "pending",
    });

    // Get visitor details for the email
    await appointment.populate("visitor");

    await appointmentsubmit(
      appointment.visitor.email,
      appointment.visitor.name,
      appointment.purpose,
    );

    res.status(201).json({
      success: true,
      msg: "Appointment Booked",
      appointment,
    });
  } catch (err) {
    console.log("Create appointment error:", err.message);
    return res.status(500).json({
      success: false,
      msg: "Unable to create appointment",
    });
  }
};

export const approveappointment = async (req, res) => {
  try {
    const id = req.params.id;

    const appointment = await appointmentModel.findById(id).populate("visitor");

    if (!appointment) {
      return res.status(404).json({
        success: false,
        msg: "Appointment not found",
      });
    }
    // checking if already approved

    if (appointment.status === "approved") {
      return res.status(400).json({
        success: false,
        msg: "Already approved",
      });
    }

    // updating status
    appointment.status = "approved";
    await appointment.save();

    // creating QR payload
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

    //pass createion
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

    // populate for pdf and email
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
      success: true,
      msg: "Appointment approved & Pass issued successfully",
      pass,
    });
  } catch (err) {
    console.log("Approve error:", err.message);

    return res.status(500).json({
      success: false,
      msg: "Error approving appointment",
    });
  }
};

export const rejectappointment = async (req, res) => {
  try {
    const { remark } = req.body;

    if (!remark) {
      return res.status(400).json({
        success: false,
        message: "Remark is required",
      });
    }

    const appointmentId=req.params.id
    const appointment = await appointmentModel.findById(appointmentId).populate("visitor");

    appointment.status="rejected";
    appointment.remark=remark;
    await appointment.save()

    await reject(
      appointment.visitor.email,
      appointment.visitor.name,
      appointment.remark,
    );

    res.status(200).json({
      success: true,
      message: "Appointment rejected with remark",
      appointment,
    });
  } catch (error) {
    console.log("Reject error:", err.message);
    return res.status(500).json({
      success: false,
      msg: "Error rejecting appointment",
    });
  }
};
export const getappointment = async (req, res) => {
  try {
    const appointments = await appointmentModel
      .find()
      .populate("visitor", "name email");

    res.status(200).json({
      success: true,
      appointments,
    });
  } catch (err) {
    console.log("Reject error:", err.message);
    return res.status(500).json({
      success: false,
      msg: "Error rejecting appointment",
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
        success: false,
        msg: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      appointment,
    });
  } catch (err) {
    console.log("Reject error:", err.message);
    return res.status(500).json({
      success: false,
      msg: "Error rejecting appointment",
    });
  }
};
