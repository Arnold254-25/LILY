
// Import required modules
const express = require("express");
const mongoose = require("mongoose");//-
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const assignmentRoutes = require("./assignmentRoutes");
const authRoutes = require("./authRoutes");
const reportRoutes = require("./routes/reportRoutes");

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// Create an instance of the Express application
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies

// Database connection//-
mongoose//-
  .connect(process.env.MONGO_URI, {//-
    useNewUrlParser: true,//-
    useUnifiedTopology: true,//-
  })//-
  .then(() => console.log("MongoDB connected"))//-
  .catch((err) => console.error("MongoDB connection error:", err));//-
// Routes
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/assignments", assignmentRoutes); // Assignment routes
app.use("/api/reports", reportRoutes); // Report routes

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
