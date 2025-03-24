import mongoose from 'mongoose';

const TruthSchema = new mongoose.Schema({
  text: { type: String, required: true },
  level: { 
    type: String, 
    enum: ['basic', 'adult', 'violent'],
    default: 'basic',
    required: true 
  }
});

export default mongoose.models.Truth || mongoose.model('Truth', TruthSchema);
