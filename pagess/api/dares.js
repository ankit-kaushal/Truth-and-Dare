import connectToDatabase from '../../lib/mongodb';
import Dare from '../../models/Dare';

export default async function handler(req, res) {
  const { method } = req;

  await connectToDatabase();

  switch (method) {
    case 'GET':
      try {
        const dares = await Dare.find({});
        res.status(200).json({ success: true, data: dares });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const dare = await Dare.create(req.body);
        res.status(201).json({ success: true, data: dare });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
