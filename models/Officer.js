const mongoose = require("mongoose");

const OfficerSchema = new mongoose.Schema({
  officerId: { type: String, required: true, unique: true }, // For "23331A05I3"
  name: String,
  password: { type: String, required: true }, 
  district: String,
  mandal: String,
  role: { type: String, default: "OFFICER" }
});

module.exports = mongoose.model("Officer", OfficerSchema);