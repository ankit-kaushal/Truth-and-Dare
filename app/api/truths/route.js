import connectToDatabase from '../../../lib/mongodb';
import Truth from '../../../models/Truth';

export async function GET(request) {
  try {
    await connectToDatabase();
    const truths = await Truth.find({});
    return new Response(JSON.stringify({ success: true, data: truths }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching truths:', error.message);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();
    console.log(request, 'reeeeeee');
    const body = await request.json();
    const truth = await Truth.create(body);
    return new Response(JSON.stringify({ success: true, data: truth }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error adding truth:', error.message);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function DELETE(request, res) {
  const { method } = request
  console.log(method, 'method');
  try {
    await connectToDatabase();
    const body = await request.json();
    const { id } = body;
    const truth = await Truth.findByIdAndDelete(id);
    return new Response(JSON.stringify({ success: true }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error deleting truth:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}