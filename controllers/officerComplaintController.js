const Complaint = require("../models/Complaint");

exports.getComplaintsForOfficer = async (req, res) => {
  try {
    const { district, mandal, department } = req.query;

    let filter = { district, mandal };

    // Apply department filter only if selected
    if (department) {
      filter["aiAnalysis.department"] = department;
    }

    const complaints = await Complaint.find(filter).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateComplaintStatus = async (req, res) => {
  const { id } = req.params;
  const { status, reason } = req.body; // Destructure reason from body

  try {
    const updateData = { status };
    if (reason) updateData.reason = reason; // Add reason to update object if provided

    await Complaint.findByIdAndUpdate(id, updateData);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteComplaint = async (req, res) => {
  const { id } = req.params;
  await Complaint.findByIdAndDelete(id);
  res.json({ success: true });
};
