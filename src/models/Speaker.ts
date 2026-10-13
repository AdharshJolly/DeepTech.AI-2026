import mongoose from 'mongoose';

const SpeakerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  company: { type: String, required: true },
  bio: { type: String },
  imageUrl: { type: String },
  order: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  linkedinUrl: {
    type: String,
    validate: {
      validator: (v: string) =>
        !v || /^https:\/\/([a-z0-9-]+\.)?linkedin\.com\//i.test(v),
      message: 'LinkedIn URL must start with https:// and be on linkedin.com',
    },
  },
}, { timestamps: true });

export default mongoose.models.Speaker || mongoose.model('Speaker', SpeakerSchema);
