// backend/routes/assignment.js
const express = require("express");
const multer = require("multer");
const Assignment = require("../models/Assignments"); // Ensure this matches your model file name
const authMiddleware = require("../middleware/authMiddleware"); // Corrected import
const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename
  },
});

const upload = multer({ storage });

// Upload assignment
router.post("/", authMiddleware, upload.single("file"), async (req, res) => {
  const { title, description, deadline } = req.body;

  try {
    // Validate input
    if (!title || !description || !deadline || !req.file) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newAssignment = new Assignment({
      title,
      description,
      deadline,
      file: req.file.path, // Path to the uploaded file
      studentId: req.user.id, // Get student ID from the token
    });

    await newAssignment.save();
    res.status(201).json({ message: "Assignment uploaded successfully" });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Server error" });
  }
});

// Get assignments for a specific student
router.get("/", authMiddleware, async (req, res) => {
  try {
    const assignments = await Assignment.find({ studentId: req.user.id });
    res.json(assignments);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;