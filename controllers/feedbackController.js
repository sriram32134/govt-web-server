const Feedback = require("../models/Feedback");

// Citizens: Submit new feedback
exports.submitFeedback = async (req, res) => {
  try {
    const { email, feedback } = req.body;
    if (!email || !feedback) {
      return res.status(400).json({ success: false, message: "Email and feedback are required" });
    }

    const newFeedback = new Feedback({ email, feedback });
    await newFeedback.save();

    res.status(201).json({ success: true, message: "Feedback submitted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Officers: Retrieve all feedback for the dashboard
exports.getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};