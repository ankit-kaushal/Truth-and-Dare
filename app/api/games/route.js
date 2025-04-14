import connectToDatabase from '@/lib/mongodb';
import Game from '@/models/Game';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    await connectToDatabase();
    const { players, truths, dares, mode, userId } = await request.json();

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

    // Update user's gameIds array
    if (userId) {
      await User.findByIdAndUpdate(userId, {
        $push: { gameIds: game._id } 
      });
    }
    
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

export async function GET(request) {
  try {
    await connectToDatabase();
    const userId = request.nextUrl.searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { message: 'User ID is required' },
        { status: 400 }
      );
    }

    const user = await User.findById(userId).lean();
    console.log('Found user:', user);

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // Get games only by gameIds
    const games = await Game.find({
      _id: { $in: user.gameIds || [] }
    }).sort({ createdAt: -1 });

    console.log('Found games:', games);
    
    return NextResponse.json({ games });
  } catch (error) {
    console.error('Error in GET games:', error);
    return NextResponse.json(
      { message: 'Error fetching games', error: error.message },
      { status: 500 }
    );
  }
}