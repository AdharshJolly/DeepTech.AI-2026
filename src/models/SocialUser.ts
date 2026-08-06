import mongoose from "mongoose";

const SocialUserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    socialHandle: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.models.SocialUser ||
  mongoose.model("SocialUser", SocialUserSchema);
