import mongoose from "mongoose";
import ErrorHandler from "../utils/ErrorHandler.js";
import dotenv from "dotenv";

dotenv.config();

const connectDatabase = async () => {
  try {
    const { MONGODB_URL, DB_NAME } = process.env;
    if (!MONGODB_URL || !DB_NAME) {
      throw new Error(
        "MONGODB_URL or DB_NAME not found in .env file hahahaahh",
      );
    }

    const connectionString = `${MONGODB_URL}/${DB_NAME}?retryWrites=true&w=majority`;

    const connectionInstance = await mongoose.connect(connectionString);

    console.log(
      `✅ MongoDB connected!! DB host ${connectionInstance.connection.host}`,
    );
  } catch (error) {
    console.log("❌ MongoDB connection FAILED : ", error);
    process.exit(1);
  }
};

export default connectDatabase;
