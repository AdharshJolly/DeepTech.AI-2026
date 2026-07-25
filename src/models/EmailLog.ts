import mongoose from "mongoose";

const EmailLogSchema = new mongoose.Schema(
  {
    to: { type: String, required: true, lowercase: true },
    subject: { type: String, required: true },
    type: { type: String, required: true },
    sentAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

EmailLogSchema.index({ sentAt: 1 });

export default mongoose.models.EmailLog ||
  mongoose.model("EmailLog", EmailLogSchema);
