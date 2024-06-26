import mongoose from 'mongoose';

const PlayerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
});

export default mongoose.models.Player || mongoose.model('Player', PlayerSchema);
