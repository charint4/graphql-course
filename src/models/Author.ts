import mongoose, { Schema } from "mongoose";

const authorSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    verified: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

export const AuthorModel = mongoose.model("Author", authorSchema);