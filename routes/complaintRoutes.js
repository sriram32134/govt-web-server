const express = require("express");
const router = express.Router();
const { submitFeedback } = require("../controllers/feedbackController");
const {
  raiseComplaint,
  getComplaintsByMobile,
  deleteComplaintByUser
} = require("../controllers/complaintController");

router.post("/raise", raiseComplaint);
router.get("/user/:mobile", getComplaintsByMobile);
router.delete("/:id", deleteComplaintByUser);

// New Feedback Route
router.post("/feedback", submitFeedback);

module.exports = router;