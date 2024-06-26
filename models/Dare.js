import mongoose from 'mongoose';

const DareSchema = new mongoose.Schema({
  text: { type: String, required: true },
});

export default mongoose.models.Dare || mongoose.model('Dare', DareSchema);
