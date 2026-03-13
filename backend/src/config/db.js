import mongoose from "mongoose";

const dbconnect = async () => {
  const url = process.env.MONGO_URL;

  if (!url) {
    console.error("MONGO_URL not defined in environment variables");
    process.exit(1);
  }

  try {
    await mongoose.connect(url);
    console.log("Mongodb connected");
  } catch (err) {
    console.log(err.message);
  }
};

export default dbconnect;
