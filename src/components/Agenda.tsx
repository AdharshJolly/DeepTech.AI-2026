import connectToDatabase from "@/lib/db";
import AgendaModel from "@/models/Agenda";
import AgendaClient, { type AgendaItem } from "./AgendaClient";
import AgendaError from "./AgendaError";

export default async function Agenda() {
  let dbItems: Array<Record<string, unknown>> = [];
  let errorOccurred = false;

  try {
    await connectToDatabase();
    dbItems = (await AgendaModel.find()
      .sort({ order: 1 })
      .lean()) as Array<Record<string, unknown>>;
  } catch (error) {
    console.error("Failed to fetch agenda from MongoDB:", error);
    errorOccurred = true;
  }

  if (errorOccurred) {
    return (
      <AgendaError
        type="fetch_error"
        message="Unable to connect to the agenda database. Please try refreshing the page or try again shortly."
      />
    );
  }

  if (!dbItems || dbItems.length === 0) {
    return (
      <AgendaError
        type="empty"
        message="No agenda sessions are currently scheduled in the system. Please check back shortly for updates."
      />
    );
  }

  const itemsToRender: AgendaItem[] = dbItems.map((item) => ({
    _id: item._id ? (item._id as { toString(): string }).toString() : undefined,
    time: String(item.time || ""),
    title: String(item.title || ""),
    speakerName: item.speakerName ? String(item.speakerName) : undefined,
    track: item.track ? String(item.track) : undefined,
    type: String(item.type || "keynote"),
    description: item.description ? String(item.description) : undefined,
    order: typeof item.order === "number" ? item.order : 0,
  }));

  return <AgendaClient agendaItems={itemsToRender} />;
}
