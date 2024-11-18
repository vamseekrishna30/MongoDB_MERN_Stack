const express = require('express');
const Complaint = require('../models/Complaint');
const router = express.Router();

// Submit Complaint
router.post('/submit', async (req, res) => {
  const { userId, issueDescription } = req.body;

  const newComplaint = new Complaint({ userId, issueDescription });
  await newComplaint.save();
  res.status(201).json({ message: 'Complaint submitted successfully' });
});

// Get Complaints for a User
router.get('/user/:userId', async (req, res) => {
  const complaints = await Complaint.find({ userId: req.params.userId });
  res.json(complaints);
});

module.exports = router;
