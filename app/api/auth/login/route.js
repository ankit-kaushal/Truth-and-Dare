import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "@/config/auth";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectToDatabase();

    const { email, password } = await request.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 },
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 },
      );
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN },
    );

    user.token = token;
    await user.save();

    const userWithoutPassword = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      image: user.image,
      token,
    };

    return NextResponse.json({ user: userWithoutPassword }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error logging in", error: error.message },
      { status: 500 },
    );
  }
}
