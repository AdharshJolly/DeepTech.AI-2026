import connectToDatabase from "@/lib/db";
import AgendaModel from "@/models/Agenda";
import { OFFICIAL_AGENDA_DATA } from "@/data/agendaData";
import AgendaClient from "./AgendaClient";

export default async function Agenda() {
  let dbItems: Array<Record<string, unknown>> = [];
  try {
    await connectToDatabase();
    dbItems = (await AgendaModel.find().sort({ order: 1 }).lean()) as Array<Record<string, unknown>>;
  } catch (error) {
    console.error("Failed to fetch agenda from database, falling back to official schedule:", error);
  }

  const itemsToRender =
    dbItems.length > 0
      ? dbItems.map((item) => ({
          ...item,
          _id: item._id ? (item._id as { toString(): string }).toString() : undefined,
          time: String(item.time || ""),
          title: String(item.title || ""),
          speakerName: item.speakerName ? String(item.speakerName) : undefined,
          track: item.track ? String(item.track) : undefined,
          type: String(item.type || "keynote"),
          description: item.description ? String(item.description) : undefined,
          order: typeof item.order === "number" ? item.order : 0,
        }))
      : OFFICIAL_AGENDA_DATA.map((item) => ({
          ...item,
          _id: `official-${item.order}`,
        }));

  return <AgendaClient agendaItems={itemsToRender} />;
}
