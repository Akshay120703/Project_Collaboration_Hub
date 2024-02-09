// db.js
const mongoose = require('mongoose');
const User = require('../models/userModel');
const Project = require('../models/projectModel');
const CollaborationData = require('../models/collaborationModel');

mongoose.connect('mongodb://localhost:27017/project_collaboration_hub', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));
