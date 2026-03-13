import { appointmentModel } from "../models/appointmentModel.js";
import {userModel} from '../models/userModel.js'


export const totalemployess = async (req, res) => {
  try {   
    const totalemployess = await userModel.countDocuments({ role: { $ne: 'visitor' } });
    res.status(200).json({
      success: true,
      totalemployess,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch pending user count",
    });
    
  }
};

export const countpending=async (req,res)=>{
  try {
    const pendingCount = await userModel.countDocuments({
      status: "pending",
    });

    res.status(200).json({
      success: true,
      pending: pendingCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch pending user count",
    });
  }

}

export const countvisitors =async(req,res)=>{
  try {   
    const visitors = await userModel.countDocuments({ role: { $eq: 'visitor' } });
    res.status(200).json({
      success: true,
      visitors,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch pending visitors count",
    });
    
  }
};



export const appointmentstats = async (req, res) => {
 try {
    const countap = await appointmentModel.countDocuments();

    res.status(200).json({
      success: true,
     countap,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch pending user count",
    });
  }
};

