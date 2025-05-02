import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import TempOTP from "@/models/TempOTP";

export async function POST(req) {
  try {
    const { email, otp } = await req.json();
    await connectToDatabase();

    const tempOTP = await TempOTP.findOne({
      email,
      otp,
      expiry: { $gt: new Date() },
    });

    if (!tempOTP) {
      return NextResponse.json(
        { message: "Invalid or expired OTP" },
        { status: 400 },
      );
    }

    await TempOTP.deleteOne({ _id: tempOTP._id });

    return NextResponse.json({
      message: "OTP verified successfully",
      verified: true,
    });
  } catch (error) {
    console.error("Verify OTP Error:", error);
    return NextResponse.json(
      { message: "Failed to verify OTP" },
      { status: 500 },
    );
  }
}
