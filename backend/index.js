const express = require("express");
const pdfRoutes = require("./routes/pdfRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: false,
  })
);

app.use("/pdf", pdfRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`PDF service running on port ${PORT}`));
