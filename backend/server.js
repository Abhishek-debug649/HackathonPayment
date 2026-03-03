require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint (for cron-job pinging to keep Render alive)
app.get('/', (req, res) => {
    res.json({ status: 'ok', message: 'HackathonPayment API is running', uptime: process.uptime() });
});

// Routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Start server immediately
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });
