import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "inactive",
    },
    fName: {
      type: String,
      required: true,
    },
    lName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "inactive",
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: 1,
    },

    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      required: false,
    },
    verificationCode: {
      type: String,
      defualt: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Admin", adminSchema); // create adimin table
