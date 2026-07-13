"use client";
import React, { useState, useEffect, useRef } from "react";
import { Loader2, Trash2, Plus, Edit2, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AgendaItem {
  _id: string;
  time: string;
  title: string;
  speakerName?: string;
  track?: string;
  type: string;
  description?: string;
  order?: number;
}

export default function AgendaManager() {
  const [agenda, setAgenda] = useState<AgendaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  const fetchAgenda = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/agenda");
    const data = await res.json();
    setAgenda(data);
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAgenda();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item: AgendaItem) => {
    setEditingId(item._id);
    setIsModalOpen(true);
        setTimeout(() => {
        if (formRef.current) {
          const form = formRef.current;
          (form.elements.namedItem("time") as HTMLInputElement).value = item.time;
          (form.elements.namedItem("title") as HTMLInputElement).value = item.title;
          (form.elements.namedItem("speakerName") as HTMLInputElement).value = item.speakerName || "";
          (form.elements.namedItem("track") as HTMLInputElement).value = item.track || "";
          (form.elements.namedItem("type") as HTMLSelectElement).value = item.type;
          (form.elements.namedItem("description") as HTMLTextAreaElement).value = item.description || "";
          (form.elements.namedItem("order") as HTMLInputElement).value = (item.order || 0).toString();
        }
      }, 100);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setEditingId(null);
      if (formRef.current) formRef.current.reset();
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);

    const formData = new FormData(e.currentTarget);

    const payload = {
      ...(editingId && { _id: editingId }),
      time: formData.get("time"),
      title: formData.get("title"),
      speakerName: formData.get("speakerName"),
      track: formData.get("track"),
      type: formData.get("type"),
      description: formData.get("description"),
      order: Number(formData.get("order")) || 0,
    };

    await fetch("/api/admin/agenda", {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setUploading(false);
    closeModal();
    fetchAgenda();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this session?")) return;
    await fetch(`/api/admin/agenda?id=${id}`, { method: "DELETE" });
    fetchAgenda();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button 
          onClick={openAddModal}
          className="bg-ieee-blue text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-ieee-blue/90 hover:scale-105 active:scale-95 transition-all shadow-md"
        >
          <Plus className="w-5 h-5"/> Add Session
        </button>
      </div>

      {/* Modal Form */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-ieee-black/40 backdrop-blur-sm"
              onClick={closeModal}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl border border-ieee-gray/10 w-full max-w-2xl relative z-10 overflow-hidden"
            >
              <div className="p-6 border-b border-ieee-gray/10 flex items-center justify-between bg-ieee-gray/5">
                <h2 className="text-xl font-bold flex items-center gap-2 text-ieee-black">
                  {editingId ? <Edit2 className="w-5 h-5 text-ieee-blue"/> : <Plus className="w-5 h-5 text-ieee-blue"/>} 
                  {editingId ? "Edit Agenda Session" : "Add New Session"}
                </h2>
                <button onClick={closeModal} className="p-2 text-ieee-gray hover:text-ieee-black hover:bg-ieee-gray/10 rounded-full transition-colors">
                  <X className="w-5 h-5"/>
                </button>
              </div>
              
              <div className="p-6">
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input name="time" placeholder="Time (e.g., 09:00 AM)" required className="p-3.5 bg-ieee-gray/5 border border-ieee-gray/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-ieee-blue focus:bg-white transition-all w-full" />
                    <input name="title" placeholder="Title" required className="p-3.5 bg-ieee-gray/5 border border-ieee-gray/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-ieee-blue focus:bg-white transition-all w-full" />
                    <input name="speakerName" placeholder="Speaker Name (Optional)" className="p-3.5 bg-ieee-gray/5 border border-ieee-gray/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-ieee-blue focus:bg-white transition-all w-full" />
                    <input name="track" placeholder="Track / Location" className="p-3.5 bg-ieee-gray/5 border border-ieee-gray/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-ieee-blue focus:bg-white transition-all w-full" />
                    
                    <div className="relative">
                      <select name="type" required className="w-full p-3.5 bg-ieee-gray/5 border border-ieee-gray/10 rounded-2xl appearance-none focus:outline-none focus:ring-2 focus:ring-ieee-blue focus:bg-white transition-all cursor-pointer text-ieee-black">
                        <option value="">Select Type</option>
                        <option value="keynote">Keynote</option>
                        <option value="panel">Panel</option>
                        <option value="workshop">Workshop</option>
                        <option value="networking">Networking</option>
                        <option value="break">Break</option>
                      </select>
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                        <ChevronDown className="w-5 h-5 text-ieee-gray" />
                      </div>
                    </div>

                    <input name="order" type="number" placeholder="Order (e.g., 1)" className="p-3.5 bg-ieee-gray/5 border border-ieee-gray/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-ieee-blue focus:bg-white transition-all w-full" />
                  </div>
                  <textarea name="description" placeholder="Description" className="w-full p-3.5 bg-ieee-gray/5 border border-ieee-gray/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-ieee-blue focus:bg-white transition-all" rows={4}></textarea>

                  <div className="pt-4 flex gap-3 justify-end">
                    <button type="button" onClick={closeModal} className="px-6 py-3 rounded-2xl font-bold text-ieee-gray hover:bg-ieee-gray/10 transition-colors">
                      Cancel
                    </button>
                    <button type="submit" disabled={uploading} className="bg-ieee-blue text-white px-8 py-3 rounded-2xl font-bold hover:bg-ieee-blue/90 disabled:opacity-50 transition-colors shadow-md flex items-center justify-center gap-2 min-w-[140px]">
                      {uploading && <Loader2 className="w-5 h-5 animate-spin" />}
                      {uploading ? "Saving..." : "Save Session"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* List */}
      <div className="bg-white rounded-3xl shadow-sm border border-ieee-gray/10 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-ieee-gray"><Loader2 className="w-8 h-8 animate-spin mx-auto text-ieee-blue"/></div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-ieee-gray/5 border-b border-ieee-gray/10">
              <tr>
                <th className="p-5 font-bold text-ieee-gray text-sm uppercase tracking-wider">Time</th>
                <th className="p-5 font-bold text-ieee-gray text-sm uppercase tracking-wider">Title & Type</th>
                <th className="p-5 font-bold text-ieee-gray text-sm uppercase tracking-wider">Track / Speaker</th>
                <th className="p-5 font-bold text-ieee-gray text-sm uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {agenda.map((a) => (
                <tr key={a._id} className="border-b border-ieee-gray/5 hover:bg-ieee-gray/5 transition-colors group">
                  <td className="p-5 font-mono font-bold text-ieee-black">{a.time}</td>
                  <td className="p-5 font-bold text-ieee-black text-lg">{a.title} <span className="block text-xs uppercase text-ieee-orange mt-1">{a.type}</span></td>
                  <td className="p-5 text-sm text-ieee-gray font-medium">{a.track || "-"} <br/><span className="text-ieee-black/60">{a.speakerName}</span></td>
                  <td className="p-5 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleEdit(a)} className="text-ieee-blue hover:bg-ieee-blue/10 p-2.5 rounded-xl transition-colors"><Edit2 className="w-5 h-5"/></button>
                      <button onClick={() => handleDelete(a._id)} className="text-red-500 hover:bg-red-50 p-2.5 rounded-xl transition-colors"><Trash2 className="w-5 h-5"/></button>
                    </div>
                  </td>
                </tr>
              ))}
              {agenda.length === 0 && !loading && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-ieee-gray font-medium">No sessions added yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
