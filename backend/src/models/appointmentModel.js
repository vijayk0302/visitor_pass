  import mongoose from "mongoose";

  const appointmentSchema= new mongoose.Schema({
      visitor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      phone: {
        type: String,
        required: true,
      },

      photo: {
        type: String,
        required: true,
      },

      idproof: {
        type: String,
        required: true,
      },

      visitDate: {
        type: Date,
        required: true,
      },

      purpose: {
        type: String,
        required: true,
        trim: true,
      },

      status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
      },
  },{timestamps:true})

  export const appointmentModel=mongoose.model('Appointment',appointmentSchema)