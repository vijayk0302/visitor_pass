import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["admin", "security", "employee",'visitor'],
      default: "employee"
    },
    status: {
      type: String,
      enum: ["pending", "active"],
      default: "pending"
    }
},{timestamps:true})

export const userModel=mongoose.model('User',userSchema)