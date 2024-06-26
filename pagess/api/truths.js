import connectToDatabase from '../../lib/mongodb';
import Truth from '../../models/Truth';

export default async function handler(req, res) {
  const { method } = req;

  await connectToDatabase();

  switch (method) {
    case 'GET':
      try {
        const truths = await Truth.find({});
        res.status(200).json({ success: true, data: truths });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const truth = await Truth.create(req.body);
        res.status(201).json({ success: true, data: truth });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
