import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['player', 'admin'], default: 'player' },
  gameIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }],
  token: { type: String }
}, {
  timestamps: true
});

// TO DO- Show all games corresponding to a user

export default mongoose.models.User || mongoose.model('User', UserSchema);