import mongoose from 'mongoose';

const DareSchema = new mongoose.Schema({
  text: { type: String, required: true },
  level: { 
    type: String, 
    enum: ['basic', 'adult', 'violent'],
    default: 'basic',
    required: true 
  }
});

export default mongoose.models.Dare || mongoose.model('Dare', DareSchema);
