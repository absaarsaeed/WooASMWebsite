const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateLicenseKey, generateToken, generateId } = require('../utils/helpers');
const { authenticateToken, JWT_SECRET } = require('../middleware/auth');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password, name, company_name } = req.body;
    
    if (!email || !password || !name) {
      return res.status(400).json({ detail: 'Email, password, and name are required' });
    }
    
    // Check if user exists
    const existingUser = await req.db.collection('users').findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ detail: 'Email already registered' });
    }
    
    // Hash password
    const password_hash = await bcrypt.hash(password, 10);
    
    // Create user
    const user = {
      id: generateId(),
      email: email.toLowerCase(),
      password_hash,
      name,
      company_name: company_name || '',
      email_verified: false,
      verification_token: generateToken(),
      plan: 'free',
      billing_cycle: null,
      subscription_status: 'active',
      subscription_ends_at: null,
      stripe_customer_id: null,
      stripe_subscription_id: null,
      license_key: generateLicenseKey(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      last_login_at: null
    };
    
    await req.db.collection('users').insertOne(user);
    
    // Remove sensitive fields
    const { password_hash: _, verification_token: __, ...safeUser } = user;
    delete safeUser._id;
    
    res.status(201).json({
      message: 'Registration successful. Please check your email to verify your account.',
      user: safeUser
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ detail: 'Registration failed' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ detail: 'Email and password are required' });
    }
    
    // Find user
    const user = await req.db.collection('users').findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ detail: 'Invalid email or password' });
    }
    
    // Verify password
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ detail: 'Invalid email or password' });
    }
    
    // Update last login
    await req.db.collection('users').updateOne(
      { id: user.id },
      { $set: { last_login_at: new Date().toISOString() } }
    );
    
    // Generate tokens
    const access_token = jwt.sign(
      { user_id: user.id, type: 'access' },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    const refresh_token = jwt.sign(
      { user_id: user.id, type: 'refresh' },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    // Remove sensitive fields
    const { password_hash, verification_token, reset_token, _id, ...safeUser } = user;
    
    res.json({
      access_token,
      refresh_token,
      token_type: 'bearer',
      user: safeUser
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ detail: 'Login failed' });
  }
});

// Refresh token
router.post('/refresh', async (req, res) => {
  try {
    const { refresh_token } = req.body;
    
    if (!refresh_token) {
      return res.status(400).json({ detail: 'Refresh token required' });
    }
    
    const decoded = jwt.verify(refresh_token, JWT_SECRET);
    
    if (decoded.type !== 'refresh') {
      return res.status(401).json({ detail: 'Invalid refresh token' });
    }
    
    const access_token = jwt.sign(
      { user_id: decoded.user_id, type: 'access' },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    res.json({ access_token, token_type: 'bearer' });
  } catch (error) {
    res.status(401).json({ detail: 'Invalid or expired refresh token' });
  }
});

// Verify email
router.post('/verify-email', async (req, res) => {
  try {
    const { token } = req.body;
    
    const user = await req.db.collection('users').findOne({ verification_token: token });
    if (!user) {
      return res.status(400).json({ detail: 'Invalid verification token' });
    }
    
    await req.db.collection('users').updateOne(
      { id: user.id },
      { 
        $set: { email_verified: true, updated_at: new Date().toISOString() },
        $unset: { verification_token: '' }
      }
    );
    
    res.json({ message: 'Email verified successfully' });
  } catch (error) {
    res.status(500).json({ detail: 'Verification failed' });
  }
});

// Forgot password
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    
    const user = await req.db.collection('users').findOne({ email: email.toLowerCase() });
    if (!user) {
      // Don't reveal if email exists
      return res.json({ message: 'If an account exists, a reset link has been sent.' });
    }
    
    const reset_token = generateToken();
    const reset_expires = new Date(Date.now() + 3600000).toISOString(); // 1 hour
    
    await req.db.collection('users').updateOne(
      { id: user.id },
      { $set: { reset_token, reset_token_expires: reset_expires } }
    );
    
    // TODO: Send email with reset link
    
    res.json({ message: 'If an account exists, a reset link has been sent.' });
  } catch (error) {
    res.status(500).json({ detail: 'Request failed' });
  }
});

// Reset password
router.post('/reset-password', async (req, res) => {
  try {
    const { token, new_password } = req.body;
    
    const user = await req.db.collection('users').findOne({
      reset_token: token,
      reset_token_expires: { $gt: new Date().toISOString() }
    });
    
    if (!user) {
      return res.status(400).json({ detail: 'Invalid or expired reset token' });
    }
    
    const password_hash = await bcrypt.hash(new_password, 10);
    
    await req.db.collection('users').updateOne(
      { id: user.id },
      {
        $set: { password_hash, updated_at: new Date().toISOString() },
        $unset: { reset_token: '', reset_token_expires: '' }
      }
    );
    
    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ detail: 'Reset failed' });
  }
});

// Get current user
router.get('/me', authenticateToken, (req, res) => {
  res.json(req.user);
});

// Logout (client-side token removal, but we can track it)
router.post('/logout', authenticateToken, (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;
