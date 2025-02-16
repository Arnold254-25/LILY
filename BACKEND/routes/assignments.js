const express = require('express');
const multer = require('multer');
const Assignment = require('../models/Assignment');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Upload Assignment
router.post('/upload', authMiddleware, upload.single('assignment'), async (req, res) => {
  const { assignmentTitle } = req.body;
  const newAssignment = new Assignment({
    studentID: req.user.id,
    filename: req.file.originalname,
    filepath: req.file.path,
    assignmentTitle,
  });

  await newAssignment.save();
  res.status(201).send('Assignment uploaded successfully');
});

// Get Assignments
router.get('/', authMiddleware, async (req, res) => {
  let assignments;
  if (req.user.role === 'admin') {
    assignments = await Assignment.find().populate('studentID', 'username');
  } else {
    assignments = await Assignment.find({ studentID: req.user.id }).populate('studentID', 'username');
  }
  res.json(assignments);
});

module.exports = router;