// projectRoutes.js
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const Project = require('../models/projectModel');

// Route to get a list of projects (protected route)
router.get('/', authenticateToken, async (req, res) => {
  try {
    // Fetch projects from the database
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    console.error('Error getting projects:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to get details of a specific project (protected route)
router.get('/:id', authenticateToken, async (req, res) => {
  const projectId = req.params.id;

  try {
    // Fetch project details from the database
    const project = await Project.findById(projectId);
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    console.error('Error getting project details:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to create a new project (protected route)
router.post('/', authenticateToken, async (req, res) => {
  const { name, description } = req.body;

  try {
    // Create a new project in the database
    const newProject = new Project({ name, description });
    await newProject.save();

    res.status(201).json(newProject);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
