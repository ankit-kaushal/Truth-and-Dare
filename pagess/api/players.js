import connectToDatabase from '../../lib/mongodb';
import Player from '../../models/Player';

export default async function handler(req, res) {
  const { method } = req;

  await connectToDatabase();

  switch (method) {
    case 'GET':
      try {
        const players = await Player.find({});
        res.status(200).json({ success: true, data: players });
      } catch (error) {
        console.error('Error fetching players:', error.message);
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case 'POST':
      try {
        const { name } = req.body;
        console.log('Received name:', name);
        if (!name) {
          throw new Error('Name is required');
        }
        const player = await Player.create({ name });
        res.status(201).json({ success: true, data: player });
      } catch (error) {
        console.error('Error adding player:', error.message);
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false, error: 'Invalid request method' });
      break;
  }
}
