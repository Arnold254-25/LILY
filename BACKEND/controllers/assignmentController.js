// backend/controllers/assignmentController.js
const Assignment = require("./models/Assignment");

// Upload an assignment
const uploadAssignment = async (req, res) => {
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
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get assignments for a specific student
const getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({ studentId: req.user.id });
    res.json(assignments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { uploadAssignment, getAssignments };