import { NextResponse } from "next/server";
import connectToDatabase from "../../../lib/mongodb";
import User from "@/models/User";

export async function GET(request) {
  try {
    await connectToDatabase();
    const searchQuery = request.nextUrl.searchParams.get("search") || "";

    const users = await User.find({
      $or: [
        { name: { $regex: searchQuery, $options: "i" } },
        { email: { $regex: searchQuery, $options: "i" } },
      ],
    }).select("name email role gameIds");

    return NextResponse.json({ users });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 },
    );
  }
}
