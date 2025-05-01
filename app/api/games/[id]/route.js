import connectToDatabase from "@/lib/mongodb";
import Game from "@/models/Game";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connectToDatabase();

    const game = await Game.findById(params.id);

    if (!game) {
      return NextResponse.json({ message: "Game not found" }, { status: 404 });
    }

    return NextResponse.json({ game });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching game", error: error.message },
      { status: 500 },
    );
  }
}
