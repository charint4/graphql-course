import mongoose from "mongoose";

const gameSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    platform: {
      type: [String],
      required: true
    }
  },
  {
    timestamps: true
  }
);

export const GameModel = mongoose.model("Game", gameSchema);