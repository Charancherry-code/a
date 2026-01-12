const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// =====================
// Health Check
// =====================
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// =====================
// Get Profile
// =====================
app.get("/profile", (req, res) => {
  db.get("SELECT * FROM profile LIMIT 1", [], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(row);
  });
});

// =====================
// Get Projects (Optional skill filter)
// =====================
app.get("/projects", (req, res) => {
  const { skill } = req.query;

  let query = "SELECT * FROM project";
  let params = [];

  if (skill) {
    query += " WHERE skill = ?";
    params.push(skill);
  }

  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// =====================
// Start Server
// =====================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
