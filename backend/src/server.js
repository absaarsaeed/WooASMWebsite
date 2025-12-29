const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const billingRoutes = require('./routes/billing');
const adminRoutes = require('./routes/admin');
const pluginRoutes = require('./routes/plugin');
const notificationRoutes = require('./routes/notifications');

const app = express();
const PORT = process.env.PORT || 8001;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : '*',
  credentials: true
}));
app.use(express.json());

// Database connection
let db;
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'wooasm_database';

async function connectDB() {
  try {
    const client = new MongoClient(mongoUrl);
    await client.connect();
    db = client.db(dbName);
    console.log('Connected to MongoDB');
    
    // Create indexes
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    await db.collection('users').createIndex({ license_key: 1 }, { unique: true });
    await db.collection('site_activations').createIndex({ site_id: 1 }, { unique: true });
    await db.collection('usage_records').createIndex({ user_id: 1, month: 1 });
    console.log('Database indexes created');
    
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

// Make db available to routes
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'WooASM API is running' });
});

app.get('/api', (req, res) => {
  res.json({ status: 'ok', message: 'WooASM API is running' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/plugin', pluginRoutes);
app.use('/api/notifications', notificationRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ detail: 'Internal server error' });
});

// Start server
connectDB().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
});

module.exports = app;
