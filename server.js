const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const aiRoutes = require('./routes/aiRoutes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const dataRoutes = require('./routes/dataRoutes');

// Routes
app.use('/api/ai', aiRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);

// Health Check
app.get('/', (req, res) => {
    res.send('PixelA2 Backend is Running 🚀');
});

// Database Check Route
app.get('/api/status', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT 1 + 1 AS solution');
        res.json({ status: 'Online', db: 'Connected', solution: rows[0].solution });
    } catch (err) {
        res.status(500).json({ status: 'Error', error: err.message });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
