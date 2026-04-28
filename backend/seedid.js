import mongoose from "mongoose";

export const allIds = {
  admin: new mongoose.Types.ObjectId(),
  employee: new mongoose.Types.ObjectId(),
  visitor: new mongoose.Types.ObjectId(),
  security: new mongoose.Types.ObjectId(),

  appointment1: new mongoose.Types.ObjectId(),
  appointment2: new mongoose.Types.ObjectId(),
  appointment3: new mongoose.Types.ObjectId(),

  pass1: new mongoose.Types.ObjectId(),
  pass2: new mongoose.Types.ObjectId(),
  pass3: new mongoose.Types.ObjectId(),

  checklog1: new mongoose.Types.ObjectId(),
  checklog2: new mongoose.Types.ObjectId(),
  checklog3: new mongoose.Types.ObjectId(),
};