import mongoose from "mongoose";

const PermissionSchema = new mongoose.Schema(
  {
    section: {
      type: String,
      required: true,
      enum: [
        "speakers",
        "committee",
        "agenda",
        "partners",
        "social",
        "registrations",
        "feature-flags",
        "users",
      ],
    },
    actions: [
      {
        type: String,
        enum: ["read", "create", "update", "delete"],
      },
    ],
  },
  { _id: false }
);

const AdminUserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["superAdmin", "admin"],
      default: "admin",
    },
    permissions: {
      type: [PermissionSchema],
      default: [],
    },
    mustChangePassword: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.AdminUser ||
  mongoose.model("AdminUser", AdminUserSchema);
