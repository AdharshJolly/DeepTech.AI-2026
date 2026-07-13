// fallow-ignore-file code-duplication
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Speaker from '@/models/Speaker';
import Committee from '@/models/Committee';
import Agenda from '@/models/Agenda';

export async function POST() {
  try {
    await connectToDatabase();

    // 1. Clear existing data
    await Speaker.deleteMany({});
    await Committee.deleteMany({});
    await Agenda.deleteMany({});

    // 2. Seed Speakers
    const speakers = await Speaker.insertMany([
      { name: "Dr. Sarah Chen", role: "Chief AI Scientist", company: "NeuroTech Global", bio: "Pioneer in brain-computer interfaces.", order: 1 },
      { name: "James Holden", role: "VP of Robotics", company: "Boston Dynamics", bio: "Leading the next generation of bipedal robotics.", order: 2 },
      { name: "Dr. Elena Rostova", role: "Director of Edge AI", company: "NVIDIA", bio: "Architect of the latest edge computing silicon.", order: 3 },
      { name: "Marcus Webb", role: "CEO", company: "Physical Intelligence", bio: "Building foundation models for robotics.", order: 4 },
    ]);

    // 3. Seed Committee
    const committee = await Committee.insertMany([
      { name: "Dr. Alan Turing", role: "General Chair", affiliation: "IEEE CS", type: "organizing", order: 1 },
      { name: "Ada Lovelace", role: "Program Chair", affiliation: "Tech University", type: "technical", order: 2 },
      { name: "Grace Hopper", role: "Advisory Head", affiliation: "Global AI Council", type: "advisory", order: 3 },
      { name: "John von Neumann", role: "Publicity Chair", affiliation: "IEEE CS", type: "organizing", order: 4 },
      { name: "Katherine Johnson", role: "Finance Chair", affiliation: "SpaceTech", type: "organizing", order: 5 },
    ]);

    // 4. Seed Agenda
    const agenda = await Agenda.insertMany([
      { time: "09:00 AM", title: "Registration & Breakfast", type: "networking", order: 1 },
      { time: "10:00 AM", title: "Keynote: The Future of Physical AI", speakerName: "Dr. Sarah Chen", type: "keynote", track: "Main Stage", order: 2 },
      { time: "11:30 AM", title: "Edge Computing in Industrial Robotics", speakerName: "Dr. Elena Rostova", type: "panel", track: "Track A", order: 3 },
      { time: "01:00 PM", title: "Networking Lunch", type: "break", order: 4 },
      { time: "02:00 PM", title: "Workshop: Building Foundation Models for Bots", speakerName: "Marcus Webb", type: "workshop", track: "Lab 1", order: 5 },
    ]);

    return NextResponse.json({ message: "Database seeded successfully!", counts: { speakers: speakers.length, committee: committee.length, agenda: agenda.length } }, { status: 200 });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
