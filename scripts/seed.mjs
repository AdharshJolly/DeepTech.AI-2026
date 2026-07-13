import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

const SpeakerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  company: { type: String, required: true },
  bio: { type: String },
  imageUrl: { type: String },
  order: { type: Number, default: 0 },
});

const CommitteeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  affiliation: { type: String, required: true },
  type: { type: String, required: true },
  imageUrl: { type: String },
  order: { type: Number, default: 0 },
});

const AgendaSchema = new mongoose.Schema({
  time: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  speakerName: { type: String },
  track: { type: String },
  type: { type: String, required: true },
  order: { type: Number, default: 0 },
});

const Speaker = mongoose.models.Speaker || mongoose.model('Speaker', SpeakerSchema);
const Committee = mongoose.models.Committee || mongoose.model('Committee', CommitteeSchema);
const Agenda = mongoose.models.Agenda || mongoose.model('Agenda', AgendaSchema);

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    await Speaker.deleteMany({});
    await Committee.deleteMany({});
    await Agenda.deleteMany({});
    console.log('Cleared existing data');

    await Speaker.insertMany([
      { name: "Dr. Sarah Chen", role: "Chief AI Scientist", company: "NeuroTech Global", bio: "Pioneer in brain-computer interfaces.", order: 1 },
      { name: "James Holden", role: "VP of Robotics", company: "Boston Dynamics", bio: "Leading the next generation of bipedal robotics.", order: 2 },
      { name: "Dr. Elena Rostova", role: "Director of Edge AI", company: "NVIDIA", bio: "Architect of the latest edge computing silicon.", order: 3 },
      { name: "Marcus Webb", role: "CEO", company: "Physical Intelligence", bio: "Building foundation models for robotics.", order: 4 },
    ]);
    console.log('Seeded Speakers');

    await Committee.insertMany([
      { name: "Dr. Alan Turing", role: "General Chair", affiliation: "IEEE CS", type: "organizing", order: 1 },
      { name: "Ada Lovelace", role: "Program Chair", affiliation: "Tech University", type: "technical", order: 2 },
      { name: "Grace Hopper", role: "Advisory Head", affiliation: "Global AI Council", type: "advisory", order: 3 },
      { name: "John von Neumann", role: "Publicity Chair", affiliation: "IEEE CS", type: "organizing", order: 4 },
      { name: "Katherine Johnson", role: "Finance Chair", affiliation: "SpaceTech", type: "organizing", order: 5 },
    ]);
    console.log('Seeded Committee');

    await Agenda.insertMany([
      { time: "09:00 AM", title: "Registration & Breakfast", type: "networking", order: 1 },
      { time: "10:00 AM", title: "Keynote: The Future of Physical AI", speakerName: "Dr. Sarah Chen", type: "keynote", track: "Main Stage", order: 2 },
      { time: "11:30 AM", title: "Edge Computing in Industrial Robotics", speakerName: "Dr. Elena Rostova", type: "panel", track: "Track A", order: 3 },
      { time: "01:00 PM", title: "Networking Lunch", type: "break", order: 4 },
      { time: "02:00 PM", title: "Workshop: Building Foundation Models for Bots", speakerName: "Marcus Webb", type: "workshop", track: "Lab 1", order: 5 },
    ]);
    console.log('Seeded Agenda');

    console.log('Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding:', error);
    process.exit(1);
  }
}

seed();
