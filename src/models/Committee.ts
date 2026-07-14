import mongoose from 'mongoose';

const CommitteeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String },
  affiliation: { type: String },
  linkedinUrl: { type: String },
  type: { 
    type: String, 
    default: 'organizing',
    enum: ['organizing', 'technical', 'advisory']
  },
  imageUrl: { type: String },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Committee || mongoose.model('Committee', CommitteeSchema);
