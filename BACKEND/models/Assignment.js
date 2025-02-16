const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  studentID: { type: mongoose.Schema.Types.ObjectId, ref: 'User ' }, // Removed extra space
  filename: { type: String, required: true },
  filepath: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
  assignmentTitle: { type: String, required: true },
});

module.exports = mongoose.model('Assignment', assignmentSchema);