import mongoose from 'mongoose';

const PartnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logoUrl: { type: String, required: true },
  websiteUrl: { type: String },
  tier: { type: String, enum: ['Platinum', 'Gold', 'Silver'], required: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Partner || mongoose.model('Partner', PartnerSchema);
