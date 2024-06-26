import connectToDatabase from '../../../lib/mongodb';
import Dare from '../../../models/Dare';

export async function GET(request) {
  try {
    await connectToDatabase();
    const dares = await Dare.find({});
    return new Response(JSON.stringify({ success: true, data: dares }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching dares:', error.message);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const dare = await Dare.create(body);
    return new Response(JSON.stringify({ success: true, data: dare }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error adding dare:', error.message);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
