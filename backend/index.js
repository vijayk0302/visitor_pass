import app from "./src/app.js";
import dotenv from "dotenv";
dotenv.config();

import dbconnect from "./src/config/db.js";

dbconnect();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await dbconnect();

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
