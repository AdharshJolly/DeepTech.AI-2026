import mongoose from "mongoose";

const PartnerInquirySchema = new mongoose.Schema(
  {
    organizationName: { type: String, required: true, trim: true },
    contactPerson: { type: String, required: true, trim: true },
    workEmail: { type: String, required: true, lowercase: true, trim: true },
    designation: { type: String, required: true, trim: true },
    partnershipTypes: { type: [String], required: true },
    collaborationNotes: { type: String, required: true, trim: true },
    website: { type: String, trim: true, default: "" },
    additionalNotes: { type: String, trim: true, default: "" },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

PartnerInquirySchema.index({ workEmail: 1 }, { unique: true });

export default mongoose.models.PartnerInquiry ||
  mongoose.model("PartnerInquiry", PartnerInquirySchema);
