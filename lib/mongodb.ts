import mongoose from "mongoose";
const { MONGODB_URI } = process.env;

// Connect MongoDB
export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(MONGODB_URI as string);
    if (connection.readyState === 1) {
      Promise.resolve(true);
      console.log("Connection with database established successfully!");
    } else
      throw new Error(
        "Something went wrong while connecting with the database..."
      );
  } catch (e) {
    console.log(e);
    Promise.reject(e);
  }
};
