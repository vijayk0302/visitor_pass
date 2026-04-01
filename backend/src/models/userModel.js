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
      required: false
    },
    role: {
      type: String,
      enum: ["admin", "security", "employee",'visitor'],
      default: "employee"
    },
    isverified:{
      type:Boolean,
      default:false
    },
    status: {
      type: String,
      enum: ["pending", "active"],
      default: "pending"
    },
    verificationcode:{
      type:String
    }
    ,resetToken:String,
    resetTokenExpiry:Date
},{timestamps:true})

export const userModel=mongoose.model('User',userSchema)