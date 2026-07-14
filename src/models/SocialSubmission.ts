import mongoose from "mongoose";

const SocialSubmissionSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    lowercase: true 
  },
  socialHandle: { 
    type: String, 
    required: true 
  },
  questId: { 
    type: String, 
    required: true,
    enum: ["quest-1", "quest-2", "quest-3", "quest-4"]
  },
  postUrl: { 
    type: String, 
    required: true,
    unique: true 
  },
  status: { 
    type: String, 
    required: true, 
    enum: ["pending", "approved", "rejected"], 
    default: "pending" 
  },
  points: { 
    type: Number, 
    required: true 
  }
}, { timestamps: true });

// Prevent a user from claiming the same quest multiple times
SocialSubmissionSchema.index({ email: 1, questId: 1 }, { unique: true });

export default mongoose.models.SocialSubmission || mongoose.model("SocialSubmission", SocialSubmissionSchema);
