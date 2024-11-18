// server.js

// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS
require('dotenv').config(); // Load environment variables from .env file

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3009', // Specify the frontend origin
    methods: ['GET', 'POST'], // Allowed methods
    credentials: true // Allow credentials
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
const mongoURI = process.env.MONGO_URI; // Use environment variable for MongoDB URI

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Complaint Model
const ComplaintSchema = new mongoose.Schema({
    name: { type: String, required: true },
    complaint: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Complaint = mongoose.model('Complaint', ComplaintSchema);

// Routes
app.post('/api/complaints', async (req, res) => {
    const { name, complaint } = req.body;

    try {
        const newComplaint = new Complaint({ name, complaint });
        await newComplaint.save();
        res.status(201).json({ message: 'Complaint submitted successfully!' });
    } catch (error) {
        console.error('Error saving complaint:', error);
        res.status(500).json({ message: 'Error submitting complaint' });
    }
});

// Get all complaints
app.get('/api/complaints', async (req, res) => {
    try {
        const complaints = await Complaint.find();
        res.status(200).json(complaints);
    } catch (error) {
        console.error('Error retrieving complaints:', error);
        res.status(500).json({ message: 'Error retrieving complaints' });
    }
});

// Start server
const PORT = process.env.PORT || 3009; // Use environment variable for port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
