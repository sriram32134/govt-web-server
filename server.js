require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const officerRoutes = require("./routes/officerRoutes");


const authRoutes = require("./routes/authRoutes");
const complaintRoutes = require("./routes/complaintRoutes");

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://YOUR_FRONTEND_URL.vercel.app" // we’ll update later
  ]
}));

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/officer", officerRoutes);

app.get("/", (req, res) => res.send("API Running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
