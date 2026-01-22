const express = require("express");
const pdfRoutes = require("./routes/pdfRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());

// Read allowed origins (comma-separated). If empty, allow localhost for dev.
const allowed = (process.env.CORS_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, cb) => {
      // Allow non-browser clients (Postman/curl) that send no Origin
      if (!origin) return cb(null, true);

      // Allow if origin is in the allowlist
      if (allowed.includes(origin)) return cb(null, true);

      // Block others (don’t throw; just deny)
      return cb(null, false);
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

// Preflight for all routes
app.options(/.*/, cors());

app.get("/", (req, res) => res.send("PDF service is running ✅"));

app.use("/pdf", pdfRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`PDF service running on port ${PORT}`));
