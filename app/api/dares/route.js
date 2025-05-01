import { NextResponse } from "next/server";
import connectToDatabase from "../../../lib/mongodb";
import Dare from "@/models/Dare";

export async function GET(request) {
  try {
    await connectToDatabase();
    const level = request.nextUrl.searchParams.get("level");
    const query = level ? { level } : {};
    const dares = await Dare.find(query);
    return NextResponse.json({ data: dares });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch dares" },
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

    const dare = await Dare.create({ text, level });
    return NextResponse.json({ data: dare }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create dare" },
      { status: 500 },
    );
  }
}

export async function DELETE(request) {
  try {
    await connectToDatabase();
    const { id } = await request.json();
    await Dare.findByIdAndDelete(id);
    return NextResponse.json({ message: "Dare deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete dare" },
      { status: 500 },
    );
  }
}
