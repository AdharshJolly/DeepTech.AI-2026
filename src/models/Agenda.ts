import mongoose from 'mongoose';

export const AGENDA_PERSON_ROLES = [
  'speaker',
  'moderator',
  'panelist',
  'dignitary',
  'keynote',
] as const;

const AgendaPersonSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  designation: { type: String, trim: true },
  role: { type: String, enum: AGENDA_PERSON_ROLES, default: 'speaker' },
  linkedinUrl: {
    type: String,
    validate: {
      validator: (v: string) =>
        !v || /^https:\/\/([a-z0-9-]+\.)?linkedin\.com\//i.test(v),
      message: 'LinkedIn URL must start with https:// and be on linkedin.com',
    },
  },
}, { _id: false });

const AgendaSchema = new mongoose.Schema({
  time: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  speakerName: { type: String },
  people: { type: [AgendaPersonSchema], default: [] },
  track: { type: String },
  type: { 
    type: String, 
    required: true,
    enum: [
      'keynote',
      'panel',
      'workshop',
      'networking',
      'break',
      'talk',
      'spotlight',
      'activity',
      'closing',
    ],
  },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Agenda || mongoose.model('Agenda', AgendaSchema);
