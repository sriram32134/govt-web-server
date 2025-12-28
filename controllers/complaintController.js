const Complaint = require("../models/Complaint");
const { analyzeComplaint } = require("../services/aiService"); // Ensure this imports the Gemini version

exports.raiseComplaint = async (req, res) => {
  try {
    // 1️⃣ Save complaint immediately to generate an ID
    const complaint = new Complaint(req.body);
    const saved = await complaint.save();

    // 2️⃣ Respond to the citizen immediately
    res.status(201).json({ success: true, data: saved });

    // 3️⃣ Run Gemini AI in background (Async process)
    // Note: We don't 'await' this entire block so the response above is sent first
    (async () => {
      try {
        console.log("🤖 Gemini AI starting analysis for:", saved._id);
        
        // Use the new Gemini-based service
        const aiResult = await analyzeComplaint(saved.description);

        // Update the document with AI results
        await Complaint.findByIdAndUpdate(saved._id, {
          aiAnalysis: aiResult,
        });

        console.log("✅ Gemini AI analysis completed:", aiResult.department);
      } catch (aiError) {
        console.error("❌ Gemini AI Background Error:", aiError.message);
      }
    })();

  } catch (error) {
    console.error("❌ Complaint error:", error.message);
    if (!res.headersSent) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};

exports.getComplaintsByMobile = async (req, res) => {
  try {
    const complaints = await Complaint.find({ mobile: req.params.mobile })
      .sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteComplaintByUser = async (req, res) => {
  try {
    const { id } = req.params;
    await Complaint.findByIdAndDelete(id);
    res.json({ success: true, message: "Complaint deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};