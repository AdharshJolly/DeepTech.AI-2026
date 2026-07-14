// fallow-ignore-file code-duplication
"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Loader2,
  Trash2,
  Plus,
  Edit2,
  Image as ImageIcon,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SpeakerItem {
  _id: string;
  name: string;
  role: string;
  company: string;
  bio?: string;
  order?: number;
  imageUrl?: string;
}

export default function SpeakersManager() {
  const [speakers, setSpeakers] = useState<SpeakerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  const fetchSpeakers = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/speakers");
    const data = await res.json();
    setSpeakers(data);
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchSpeakers();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setImagePreview(null);
    setIsModalOpen(true);
  };

  const handleEdit = (speaker: SpeakerItem) => {
    setEditingId(speaker._id);
    setImagePreview(speaker.imageUrl || null);
    setIsModalOpen(true);

    // Slight delay to allow form to render in modal
    setTimeout(() => {
      if (formRef.current) {
        const form = formRef.current;
        (form.elements.namedItem("name") as HTMLInputElement).value =
          speaker.name;
        (form.elements.namedItem("role") as HTMLInputElement).value =
          speaker.role;
        (form.elements.namedItem("company") as HTMLInputElement).value =
          speaker.company;
        (form.elements.namedItem("bio") as HTMLTextAreaElement).value =
          speaker.bio || "";
        (form.elements.namedItem("order") as HTMLInputElement).value = (
          speaker.order || 0
        ).toString();
      }
    }, 100);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setEditingId(null);
      setImagePreview(null);
      if (formRef.current) formRef.current.reset();
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);

    const formData = new FormData(e.currentTarget);
    let imageUrl = imagePreview || "";

    if (imagePreview && imagePreview.startsWith("data:image")) {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imagePreview, folder: "speakers" }),
      });
      const data = await res.json();
      imageUrl = data.url;
    }

    const payload = {
      ...(editingId && { _id: editingId }),
      name: formData.get("name"),
      role: formData.get("role"),
      company: formData.get("company"),
      bio: formData.get("bio"),
      order: Number(formData.get("order")) || 0,
      imageUrl,
    };

    await fetch("/api/admin/speakers", {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setUploading(false);
    closeModal();
    fetchSpeakers();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this speaker?")) return;
    await fetch(`/api/admin/speakers?id=${id}`, { method: "DELETE" });
    fetchSpeakers();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={openAddModal}
          className="bg-ieee-blue text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-ieee-blue/90 hover:scale-105 active:scale-95 transition-all shadow-md"
        >
          <Plus className="w-5 h-5" /> Add Speaker
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
                  {editingId ? (
                    <Edit2 className="w-5 h-5 text-ieee-blue" />
                  ) : (
                    <Plus className="w-5 h-5 text-ieee-blue" />
                  )}
                  {editingId ? "Edit Speaker" : "Add New Speaker"}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 text-ieee-gray hover:text-ieee-black hover:bg-ieee-gray/10 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input
                      name="name"
                      placeholder="Name"
                      required
                      className="p-3.5 bg-ieee-gray/5 border border-ieee-gray/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-ieee-blue focus:bg-white transition-all w-full"
                    />
                    <input
                      name="role"
                      placeholder="Role (e.g., Chief Scientist)"
                      required
                      className="p-3.5 bg-ieee-gray/5 border border-ieee-gray/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-ieee-blue focus:bg-white transition-all w-full"
                    />
                    <input
                      name="company"
                      placeholder="Company/Organization"
                      required
                      className="p-3.5 bg-ieee-gray/5 border border-ieee-gray/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-ieee-blue focus:bg-white transition-all w-full"
                    />
                    <input
                      name="order"
                      type="number"
                      placeholder="Order (e.g., 1)"
                      className="p-3.5 bg-ieee-gray/5 border border-ieee-gray/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-ieee-blue focus:bg-white transition-all w-full"
                    />
                  </div>
                  <textarea
                    name="bio"
                    placeholder="Bio"
                    className="w-full p-3.5 bg-ieee-gray/5 border border-ieee-gray/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-ieee-blue focus:bg-white transition-all"
                    rows={4}
                  ></textarea>

                  <div className="flex items-center gap-5 p-4 rounded-2xl border border-dashed border-ieee-gray/20 bg-ieee-gray/5">
                    <label className="flex items-center justify-center gap-2 px-5 py-3 bg-white border border-ieee-gray/10 rounded-xl cursor-pointer hover:border-ieee-blue hover:text-ieee-blue transition-colors shadow-sm">
                      <ImageIcon className="w-5 h-5" />
                      <span className="text-sm font-bold">Upload Headshot</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                    {imagePreview && (
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    {!imagePreview && (
                      <p className="text-xs text-ieee-gray/60 max-w-50">
                        Square ratio images work best. Max size 2MB.
                      </p>
                    )}
                  </div>

                  <div className="pt-4 flex gap-3 justify-end">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-6 py-3 rounded-2xl font-bold text-ieee-gray hover:bg-ieee-gray/10 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={uploading}
                      className="bg-ieee-blue text-white px-8 py-3 rounded-2xl font-bold hover:bg-ieee-blue/90 disabled:opacity-50 transition-colors shadow-md flex items-center justify-center gap-2 min-w-35"
                    >
                      {uploading && (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      )}
                      {uploading ? "Saving..." : "Save Speaker"}
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
          <div className="p-12 text-center text-ieee-gray">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-ieee-blue" />
          </div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-ieee-gray/5 border-b border-ieee-gray/10">
              <tr>
                <th className="p-5 font-bold text-ieee-gray text-sm uppercase tracking-wider">
                  Image
                </th>
                <th className="p-5 font-bold text-ieee-gray text-sm uppercase tracking-wider">
                  Name
                </th>
                <th className="p-5 font-bold text-ieee-gray text-sm uppercase tracking-wider">
                  Role / Company
                </th>
                <th className="p-5 font-bold text-ieee-gray text-sm uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {speakers.map((s) => (
                <tr
                  key={s._id}
                  className="border-b border-ieee-gray/5 hover:bg-ieee-gray/5 transition-colors group"
                >
                  <td className="p-5">
                    {s.imageUrl ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={s.imageUrl}
                        alt={s.name}
                        className="w-12 h-12 rounded-full object-cover shadow-sm"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-ieee-gray/10 flex items-center justify-center">
                        <ImageIcon className="w-5 h-5 text-ieee-gray/40" />
                      </div>
                    )}
                  </td>
                  <td className="p-5 font-bold text-ieee-black text-lg">
                    {s.name}
                  </td>
                  <td className="p-5 text-sm text-ieee-gray font-medium">
                    {s.role} <br />
                    <span className="text-ieee-black/60">{s.company}</span>
                  </td>
                  <td className="p-5 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEdit(s)}
                        className="text-ieee-blue hover:bg-ieee-blue/10 p-2.5 rounded-xl transition-colors"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(s._id)}
                        className="text-red-500 hover:bg-red-50 p-2.5 rounded-xl transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {speakers.length === 0 && !loading && (
                <tr>
                  <td
                    colSpan={4}
                    className="p-8 text-center text-ieee-gray font-medium"
                  >
                    No speakers added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
