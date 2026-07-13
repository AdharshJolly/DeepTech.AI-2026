import mongoose from 'mongoose';

const AgendaSchema = new mongoose.Schema({
  time: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  speakerName: { type: String },
  track: { type: String },
  type: { 
    type: String, 
    required: true,
    enum: ['keynote', 'panel', 'workshop', 'networking', 'break']
  },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Agenda || mongoose.model('Agenda', AgendaSchema);
