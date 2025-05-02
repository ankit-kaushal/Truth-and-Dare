import { NextResponse } from "next/server";
import { generateOTP, sendOTPEmail } from "@/lib/otpUtils";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import TempOTP from "@/models/TempOTP";

export async function POST(req) {
  try {
    const { email } = await req.json();
    await connectToDatabase();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 400 },
      );
    }

    const otp = generateOTP();

    // Store OTP in temporary collection
    await TempOTP.findOneAndUpdate(
      { email },
      {
        otp,
        expiry: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
      },
      { upsert: true, new: true },
    );

    await sendOTPEmail(email, otp);

    return NextResponse.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Send OTP Error:", error);
    return NextResponse.json(
      { message: "Failed to send OTP" },
      { status: 500 },
    );
  }
}
