const mongoose = require("mongoose");

const ComplaintSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  district: String,
  mandal: String,
  village: String,
  description: String,
  imageUrl: String,

  location: {
    lat: Number,
    lng: Number,
  },

  status: { type: String, default: "Pending" },

  // 🤖 AI ANALYSIS (RULE-BASED)
  aiAnalysis: {
    department: String,
    urgency: String,
    confidence: Number,
    reason: String,
  },
  reason: { type: String },
  createdAt: { type: Date, default: Date.now },

  status: {
  type: String,
  enum: ["Pending", "Accepted", "Rejected", "Completed"],
  default: "Pending"
    },
    
});

module.exports = mongoose.model("Complaint", ComplaintSchema);
