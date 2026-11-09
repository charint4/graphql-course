import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema(
  {
    rating: { 
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    content: { 
      type: String,
      required: true,
      trim: true, 
    },
    game_id: {
      type: Schema.Types.ObjectId,
      ref: "Game",
      required: true 
    },
    author_id: { 
      type: Schema.Types.ObjectId, 
      ref: "Author", 
      required: true 
    },
  },
  {
    timestamps: true
  }
);

export const ReviewModel = mongoose.model("Review", reviewSchema);
