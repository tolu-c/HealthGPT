// backend/server.js

const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

mongoose.connect("mongo uri", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
