import mongoose from "mongoose";
import { DB_NAME } from "../constant.js"; // Correct path to constant.js

const connectDB = async () => {
  try {
    const mongoUri = `${process.env.MONGODB_URI}/${DB_NAME}`; // Combine URI and DB_NAME
    console.log(`Connecting to MongoDB at ${mongoUri}`);

    const connectionInstance = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB connected! DB HOST: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("MONGODB connection error:", error.message || error);
    process.exit(1); // Exit the process if the connection fails
  }
};

export default connectDB;
