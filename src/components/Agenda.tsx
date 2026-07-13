import connectToDatabase from "@/lib/db";
import AgendaModel from "@/models/Agenda";
import AgendaClient from "./AgendaClient";

export default async function Agenda() {
  await connectToDatabase();
  const agendaItems = await AgendaModel.find().sort({ order: 1 }).lean();

  // Convert MongoDB _id (ObjectId) to string so it can be passed to Client Component
  const serializedItems = agendaItems.map((item) => ({
    ...item,
    _id: (item._id as { toString(): string }).toString(),
  }));

  return <AgendaClient agendaItems={serializedItems} />;
}
