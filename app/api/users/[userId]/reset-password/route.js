import { NextResponse } from "next/server";
import connectToDatabase from "../../../../../lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request, { params }) {
  try {
    await connectToDatabase();
    const { userId } = params;
    const { newPassword } = await request.json();

    if (!newPassword || newPassword.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const user = await User.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true },
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Password reset successful",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to reset password" },
      { status: 500 },
    );
  }
}
