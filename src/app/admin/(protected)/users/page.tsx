"use client";

import { useState, useEffect } from "react";
import {
  Users,
  Plus,
  Pencil,
  Trash2,
  Loader2,
  X,
  Shield,
  ShieldCheck,
  Key,
} from "lucide-react";

const SECTIONS = [
  { id: "speakers", label: "Speakers" },
  { id: "committee", label: "Committee" },
  { id: "agenda", label: "Agenda" },
  { id: "partners", label: "Partners" },
  { id: "social", label: "Social Claims" },
  { id: "registrations", label: "Registrations" },
  { id: "feature-flags", label: "Feature Flags" },
  { id: "users", label: "User Management" },
];

const ACTIONS = ["read", "create", "update", "delete"];

interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  permissions: { section: string; actions: string[] }[];
  mustChangePassword: boolean;
  createdAt: string;
}

interface FormData {
  name: string;
  email: string;
  role: string;
  permissions: { section: string; actions: string[] }[];
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    role: "admin",
    permissions: [],
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users");
      if (res.ok) setUsers(await res.json());
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/users");
        if (res.ok) setUsers(await res.json());
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const openCreateModal = () => {
    setEditingUser(null);
    setFormData({
      name: "",
      email: "",
      role: "admin",
      permissions: SECTIONS.map((s) => ({
        section: s.id,
        actions: ["read"],
      })),
    });
    setError(null);
    setShowModal(true);
  };

  const openEditModal = (user: AdminUser) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      permissions: user.permissions.length > 0
        ? user.permissions
        : SECTIONS.map((s) => ({ section: s.id, actions: ["read"] })),
    });
    setError(null);
    setShowModal(true);
  };

  const toggleAction = (section: string, action: string) => {
    setFormData((prev) => {
      const perms = [...prev.permissions];
      const idx = perms.findIndex((p) => p.section === section);
      if (idx === -1) {
        perms.push({ section, actions: [action] });
      } else {
        const actions = [...perms[idx].actions];
        if (actions.includes(action)) {
          actions.splice(actions.indexOf(action), 1);
        } else {
          actions.push(action);
        }
        perms[idx] = { ...perms[idx], actions };
      }
      return { ...prev, permissions: perms };
    });
  };

  const toggleAllActions = (section: string) => {
    setFormData((prev) => {
      const perms = [...prev.permissions];
      const idx = perms.findIndex((p) => p.section === section);
      if (idx === -1) {
        perms.push({ section, actions: [...ACTIONS] });
      } else {
        const allSelected = ACTIONS.every((a) =>
          perms[idx].actions.includes(a)
        );
        perms[idx] = {
          ...perms[idx],
          actions: allSelected ? [] : [...ACTIONS],
        };
      }
      return { ...prev, permissions: perms };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const url = editingUser
        ? `/api/admin/users/${editingUser._id}`
        : "/api/admin/users";
      const method = editingUser ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setShowModal(false);
        fetchUsers();
      } else {
        setError(data.error || "Failed to save user");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
      });
      if (res.ok) fetchUsers();
    } catch {
      // silently fail
    }
  };

  const handleResetPassword = async (userId: string) => {
    if (!confirm("Reset this user's password to 'password123'?")) return;

    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resetPassword: true }),
      });
      if (res.ok) alert("Password reset to 'password123'");
    } catch {
      // silently fail
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-ieee-blue/10 flex items-center justify-center">
            <Users className="w-5 h-5 text-ieee-blue" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-heading text-ieee-black">
              User Management
            </h1>
            <p className="text-sm text-ieee-gray">
              Manage admin users and their permissions
            </p>
          </div>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-5 py-2.5 bg-ieee-blue text-white rounded-xl text-sm font-bold hover:bg-ieee-blue/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create User
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-ieee-blue animate-spin" />
        </div>
      ) : users.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center border border-ieee-gray/10">
          <Users className="w-12 h-12 text-ieee-gray/30 mx-auto mb-4" />
          <p className="text-ieee-gray font-semibold">No users found</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-ieee-gray/10 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-ieee-gray/5 border-b border-ieee-gray/10">
                <th className="text-left px-6 py-4 text-xs font-bold text-ieee-black uppercase tracking-wider">
                  User
                </th>
                <th className="text-left px-6 py-4 text-xs font-bold text-ieee-black uppercase tracking-wider">
                  Role
                </th>
                <th className="text-left px-6 py-4 text-xs font-bold text-ieee-black uppercase tracking-wider hidden md:table-cell">
                  Permissions
                </th>
                <th className="text-left px-6 py-4 text-xs font-bold text-ieee-black uppercase tracking-wider">
                  Status
                </th>
                <th className="text-right px-6 py-4 text-xs font-bold text-ieee-black uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-ieee-gray/5 hover:bg-ieee-gray/5 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="font-bold text-sm text-ieee-black">
                      {user.name}
                    </div>
                    <div className="text-xs text-ieee-gray">{user.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                        user.role === "superAdmin"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-ieee-blue/10 text-ieee-blue"
                      }`}
                    >
                      {user.role === "superAdmin" ? (
                        <ShieldCheck className="w-3 h-3" />
                      ) : (
                        <Shield className="w-3 h-3" />
                      )}
                      {user.role === "superAdmin" ? "SuperAdmin" : "Admin"}
                    </span>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {user.role === "superAdmin" ? (
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                          All Access
                        </span>
                      ) : (
                        user.permissions.map((p) => (
                          <span
                            key={p.section}
                            className="text-xs font-medium text-ieee-gray bg-ieee-gray/10 px-2 py-1 rounded-full"
                          >
                            {SECTIONS.find((s) => s.id === p.section)?.label ||
                              p.section}
                          </span>
                        ))
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {user.mustChangePassword && (
                      <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                        Pending Setup
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(user)}
                        className="p-1.5 text-ieee-blue bg-ieee-blue/10 rounded-lg hover:bg-ieee-blue/20 transition-colors"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleResetPassword(user._id)}
                        className="p-1.5 text-amber-600 bg-amber-50 rounded-lg hover:bg-amber-500 hover:text-white transition-colors"
                        title="Reset Password"
                      >
                        <Key className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="p-1.5 text-rose-600 bg-rose-50 rounded-lg hover:bg-rose-500 hover:text-white transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <div className="relative bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-ieee-gray/10 transition-colors"
            >
              <X className="w-5 h-5 text-ieee-gray" />
            </button>

            <h2 className="text-xl font-bold font-heading text-ieee-black mb-6">
              {editingUser ? "Edit User" : "Create User"}
            </h2>

            {error && (
              <div className="p-4 rounded-2xl mb-6 flex items-center gap-3 text-sm font-semibold bg-red-50 text-red-700 border border-red-200">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-ieee-black uppercase tracking-wider">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full bg-ieee-gray/5 border border-ieee-gray/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ieee-blue"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-ieee-black uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="w-full bg-ieee-gray/5 border border-ieee-gray/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ieee-blue"
                    required
                    disabled={!!editingUser}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-ieee-black uppercase tracking-wider">
                  Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, role: e.target.value }))
                  }
                  className="w-full bg-ieee-gray/5 border border-ieee-gray/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ieee-blue font-semibold"
                >
                  <option value="admin">Admin</option>
                  <option value="superAdmin">SuperAdmin</option>
                </select>
              </div>

              {formData.role !== "superAdmin" && (
                <div className="space-y-3">
                  <label className="text-xs font-bold text-ieee-black uppercase tracking-wider">
                    Permissions
                  </label>
                  <div className="space-y-3">
                    {SECTIONS.map((section) => {
                      const perm = formData.permissions.find(
                        (p) => p.section === section.id
                      );
                      const allSelected = ACTIONS.every((a) =>
                        perm?.actions.includes(a)
                      );
                      return (
                        <div
                          key={section.id}
                          className="bg-ieee-gray/5 rounded-xl p-4 border border-ieee-gray/10"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-bold text-ieee-black">
                              {section.label}
                            </span>
                            <button
                              type="button"
                              onClick={() => toggleAllActions(section.id)}
                              className={`text-xs font-bold px-2 py-1 rounded-lg transition-colors ${
                                allSelected
                                  ? "bg-ieee-blue text-white"
                                  : "bg-ieee-gray/10 text-ieee-gray hover:bg-ieee-gray/20"
                              }`}
                            >
                              {allSelected ? "All" : "Toggle All"}
                            </button>
                          </div>
                          <div className="flex gap-2">
                            {ACTIONS.map((action) => (
                              <button
                                key={action}
                                type="button"
                                onClick={() =>
                                  toggleAction(section.id, action)
                                }
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                  perm?.actions.includes(action)
                                    ? "bg-ieee-blue text-white"
                                    : "bg-white border border-ieee-gray/15 text-ieee-gray hover:border-ieee-blue"
                                }`}
                              >
                                {action.charAt(0).toUpperCase() + action.slice(1)}
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {!editingUser && (
                <p className="text-xs text-ieee-gray bg-ieee-blue/5 border border-ieee-blue/15 rounded-xl p-3">
                  New users will be created with the default password{" "}
                  <strong className="text-ieee-black">password123</strong> and
                  will be required to change it on first login.
                </p>
              )}

              <button
                type="submit"
                disabled={saving}
                className="w-full bg-ieee-blue text-white py-3 rounded-xl font-bold text-sm hover:bg-ieee-blue/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : editingUser ? (
                  "Update User"
                ) : (
                  "Create User"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
