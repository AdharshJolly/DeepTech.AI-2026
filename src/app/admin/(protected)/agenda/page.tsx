import AgendaManager from "@/components/admin/AgendaManager";

export const metadata = {
  title: "Manage Agenda | Admin DeepTech.AI",
};

export default function AdminAgendaPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-black text-ieee-black mb-2">Agenda Management</h1>
        <p className="text-ieee-gray">Add, edit, or remove sessions from the conference agenda timeline.</p>
      </div>
      
      <AgendaManager />
    </div>
  );
}
