import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { type: String, enum: ['player', 'admin'], default: 'player' },
  gameIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }],
  token: { type: String },
  image: { type: String },
  emailVerified: Date,
  provider: { type: String, enum: ['credentials', 'google'], default: 'credentials' }
}, {
  timestamps: true
});

export default mongoose.models.User || mongoose.model('User', UserSchema);