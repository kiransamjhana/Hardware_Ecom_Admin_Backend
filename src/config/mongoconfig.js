import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_CLIENT);
    conn && console.log("mongo connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;
