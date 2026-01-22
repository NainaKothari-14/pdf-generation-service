const express = require("express");
const pdfRoutes = require("./routes/pdfRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());

// ✅ allow one or multiple origins from env
const allowed = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true); // Postman/curl
      if (allowed.includes(origin)) return cb(null, true);
      return cb(new Error("CORS blocked: " + origin));
    },
    methods: ["GET", "POST", "OPTIONS"],
  })
);

// ✅ handle preflight
app.options("*", cors());

app.use("/pdf", pdfRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`PDF service running on port ${PORT}`));
