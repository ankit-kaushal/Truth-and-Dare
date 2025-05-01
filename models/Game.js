import mongoose from "mongoose";

const GameSchema = new mongoose.Schema(
  {
    players: [{ type: String, required: true }],
    truths: [{ type: String }],
    dares: [{ type: String }],
    mode: {
      type: String,
      enum: ["basic", "adult", "violent"],
      default: "basic",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Game || mongoose.model("Game", GameSchema);
