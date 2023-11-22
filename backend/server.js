require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
