// collaborationRoutes.js
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const CollaborationData = require('../models/collaborationModel');

// Route to get collaboration details for a specific project (protected route)
router.get('/:projectId', authenticateToken, async (req, res) => {
  const projectId = req.params.projectId;

  try {
    // Fetch collaboration details from the database
    const collaboration = await CollaborationData.findOne({ projectId });

    if (collaboration) {
      res.json(collaboration);
    } else {
      res.status(404).json({ message: 'Collaboration data not found' });
    }
  } catch (error) {
    console.error('Error getting collaboration details:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/chat/:projectId', authenticateToken, async (req, res) => {
  const projectId = req.params.projectId;
  const { message } = req.body;

  try {
    // Fetch collaboration details from the database
    let collaboration = await CollaborationData.findOne({ projectId });

    if (!collaboration) {
      // If collaboration data doesn't exist, create a new one
      collaboration = new CollaborationData({ projectId, chatMessages: [] });
    }

    // Add a new chat message
    collaboration.chatMessages.push({ message, userId: req.user.id });

    // Save the updated collaboration data to the database
    await collaboration.save();

    res.status(201).json({ message: 'Chat message added successfully' });
  } catch (error) {
    console.error('Error adding chat message:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;
