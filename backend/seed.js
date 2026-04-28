import mongoose from "mongoose";
import dotenv from "dotenv";
import { sampleCheckLog } from "./src/SampleData/sampleChecklog.js";
import { samplePass } from "./src/SampleData/samplePass.js";
import { sampleUsers } from "./src/SampleData/sampleUser.js";
import { sampleAppointment } from "./src/SampleData/sampleAppointment.js";

import { userModel } from "./src/models/userModel.js";
import { appointmentModel } from "./src/models/appointmentModel.js";
import { passModel } from "./src/models/passModel.js";
import { checklogModel } from "./src/models/checklogModel.js";

dotenv.config();

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connected");

    await userModel.deleteMany();
    await appointmentModel.deleteMany();
    await passModel.deleteMany();
    await checklogModel.deleteMany();

    console.log("data cleared");

    const userData = await sampleUsers();
    await userModel.insertMany(userData);
    const appointments = await appointmentModel.insertMany(sampleAppointment);
    const passes = await passModel.insertMany(samplePass);
    const checkLogs = await checklogModel.insertMany(sampleCheckLog);

    console.log("Done");

    process.exit(0);
  } catch (error) {
    console.log(error);
  }
};

importData();
