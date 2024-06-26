import mongoose from 'mongoose';

const TruthSchema = new mongoose.Schema({
  text: { type: String, required: true },
});

export default mongoose.models.Truth || mongoose.model('Truth', TruthSchema);
