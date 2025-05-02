import mongoose from "mongoose";

const tempOTPSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    otp: { type: String, required: true },
    expiry: { type: Date, required: true },
  },
  {
    timestamps: true,
  },
);

const TempOTP =
  mongoose.models.TempOTP || mongoose.model("TempOTP", tempOTPSchema);

export default TempOTP;
