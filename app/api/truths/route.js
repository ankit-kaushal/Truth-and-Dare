import { NextResponse } from "next/server";
import connectToDatabase from "../../../lib/mongodb";
import Truth from "@/models/Truth";

export async function GET(request) {
  try {
    await connectToDatabase();
    const level = request.nextUrl.searchParams.get("level");
    const query = level ? { level } : {};
    const truths = await Truth.find(query);

    return NextResponse.json({ data: truths });
  } catch (error) {
    console.error("Error fetching truths:", error);
    return NextResponse.json(
      { error: "Failed to fetch truths" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();
    const { text, level = "basic" } = await request.json();

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const truth = await Truth.create({ text, level });
    return NextResponse.json({ data: truth }, { status: 201 });
  } catch (error) {
    console.error("Error creating truth:", error);
    return NextResponse.json(
      { error: "Failed to create truth" },
      { status: 500 },
    );
  }
}

export async function DELETE(request) {
  try {
    await connectToDatabase();
    const { id } = await request.json();
    await Truth.findByIdAndDelete(id);
    return NextResponse.json({ message: "Truth deleted successfully" });
  } catch (error) {
    console.error("Error deleting truth:", error);
    return NextResponse.json(
      { error: "Failed to delete truth" },
      { status: 500 },
    );
  }
}
