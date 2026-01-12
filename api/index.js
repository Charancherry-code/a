require("dotenv").config();

const express = require("express");
const cors = require("cors");
const supabase = require("../supabase");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Me-API Playground backend running");
});
// =====================
// Health Check
// =====================
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// =====================
// Get Profile
// =====================
app.get("/profile", async (req, res) => {
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .limit(1)
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// =====================
// Get Projects (Optional skill filter)
// =====================
app.get("/projects", async (req, res) => {
  const { skill } = req.query;

  let query = supabase.from("projects").select("*");

  if (skill) {
    query = query.eq("skill", skill);
  }

  const { data, error } = await query;

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// =====================
// Start Server
// =====================
module.exports = app;
