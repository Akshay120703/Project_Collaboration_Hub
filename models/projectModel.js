// projectModel.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, default: Date.now },
  // Add more fields as needed
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
