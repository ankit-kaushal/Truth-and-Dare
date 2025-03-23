import connectToDatabase from '@/lib/mongodb';
import Game from '@/models/Game';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    await connectToDatabase();

    const { players, truths, dares, mode } = await request.json();

    // Validate required fields
    if (!players || !Array.isArray(players) || players.length === 0) {
      return NextResponse.json(
        { message: 'At least one player is required' },
        { status: 400 }
      );
    }

    // Create new game
    const game = await Game.create({
      players,
      truths: truths || [],
      dares: dares || [],
      mode: mode || 'basic'
    });

    return NextResponse.json(
      { game },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Error creating game', error: error.message },
      { status: 500 }
    );
  }
}

// Get all games
export async function GET() {
  try {
    await connectToDatabase();
    const games = await Game.find().sort({ createdAt: -1 });
    
    return NextResponse.json({ games });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching games', error: error.message },
      { status: 500 }
    );
  }
}