import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    googleId: { type: String },
    password: { type: String },
    role: { type: String, enum: ["player", "admin"], default: "player" },
    gameIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Game" }],
    token: { type: String },
    authMethods: [
      {
        type: String,
        enum: ["password", "google"],
        default: ["password"],
      },
    ],
  },
  {
    timestamps: true,
  },
);

// Method to link or update authentication methods
UserSchema.methods.linkAuthMethod = async function (method, data) {
  if (!this.authMethods.includes(method)) {
    this.authMethods.push(method);
  }

  if (method === "google") {
    this.googleId = data.googleId;
    this.image = data.image || this.image;
  }
  if (method === "password") {
    this.password = data.password;
  }

  return this.save();
};

export default mongoose.models.User || mongoose.model("User", UserSchema);
