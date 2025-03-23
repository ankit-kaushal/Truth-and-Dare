import mongoose from 'mongoose';

const GameSchema = new mongoose.Schema({
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  truths: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Truth' }],
  dares: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dare' }]
}, {
  timestamps: true
});

export default mongoose.models.Game || mongoose.model('Game', GameSchema);