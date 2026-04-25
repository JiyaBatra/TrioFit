import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["customer", "seller"], default: "customer" },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },

  // Bank details
  accountHolderName: { type: String },
  accountNumber: { type: String },
  ifscCode: { type: String },

  // Seller specific
  shopName: { type: String },
  gstNumber: { type: String },
});

export default mongoose.model("User", userSchema);
