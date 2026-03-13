import mongoose from "mongoose";

const passSchema = new mongoose.Schema(
  {
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
      unique: true,
    },
    qrCode: {
      type: String,
      required: true,
    },

    validFrom: {
      type: String,
      required: true,
    },

    validTo: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "used", "expired"],
      default: "active",
    },

    issuedBy: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true },
);

export const passModel = mongoose.model("pass", passSchema);
