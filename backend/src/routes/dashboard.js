const express = require('express');
const bcrypt = require('bcryptjs');
const { authenticateToken } = require('../middleware/auth');
const { generateLicenseKey, PLAN_LIMITS, getCurrentMonth } = require('../utils/helpers');

const router = express.Router();

// Apply auth middleware to all routes
router.use(authenticateToken);

// Get dashboard overview
router.get('/', async (req, res) => {
  try {
    const user = req.user;
    const currentMonth = getCurrentMonth();
    
    // Get usage for current month
    const usage = await req.db.collection('usage_records').findOne(
      { user_id: user.id, month: currentMonth },
      { projection: { _id: 0 } }
    ) || {
      assistant_actions: 0,
      content_generations: 0,
      chatbot_messages: 0,
      insights_refreshes: 0
    };
    
    // Get sites count
    const sitesCount = await req.db.collection('site_activations').countDocuments({
      user_id: user.id,
      is_active: true
    });
    
    const limits = PLAN_LIMITS[user.plan] || PLAN_LIMITS.free;
    
    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        plan: user.plan,
        license_key: user.license_key
      },
      subscription: {
        plan: user.plan,
        status: user.subscription_status,
        billing_cycle: user.billing_cycle,
        ends_at: user.subscription_ends_at
      },
      usage: {
        assistant_actions: usage.assistant_actions || 0,
        content_generations: usage.content_generations || 0,
        chatbot_messages: usage.chatbot_messages || 0,
        insights_refreshes: usage.insights_refreshes || 0
      },
      limits: {
        sites: limits.sites,
        sites_used: sitesCount,
        assistant_actions: limits.assistant_actions,
        content_generations: limits.content_generations,
        chatbot_messages: limits.chatbot_messages,
        insights_refreshes: limits.insights_refreshes
      }
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ detail: 'Failed to load dashboard' });
  }
});

// Get license info
router.get('/license', async (req, res) => {
  try {
    const user = req.user;
    const limits = PLAN_LIMITS[user.plan] || PLAN_LIMITS.free;
    
    const sitesCount = await req.db.collection('site_activations').countDocuments({
      user_id: user.id,
      is_active: true
    });
    
    res.json({
      license_key: user.license_key,
      plan: user.plan,
      status: user.subscription_status,
      sites_used: sitesCount,
      sites_allowed: limits.sites,
      features: limits.features,
      created_at: user.created_at
    });
  } catch (error) {
    res.status(500).json({ detail: 'Failed to get license info' });
  }
});

// Regenerate license key
router.post('/regenerate-license', async (req, res) => {
  try {
    const newLicenseKey = generateLicenseKey();
    
    await req.db.collection('users').updateOne(
      { id: req.user.id },
      { $set: { license_key: newLicenseKey, updated_at: new Date().toISOString() } }
    );
    
    // Deactivate all sites with old license
    await req.db.collection('site_activations').updateMany(
      { user_id: req.user.id },
      { $set: { is_active: false } }
    );
    
    res.json({
      license_key: newLicenseKey,
      message: 'License key regenerated. All sites have been deactivated.'
    });
  } catch (error) {
    res.status(500).json({ detail: 'Failed to regenerate license' });
  }
});

// Get usage statistics
router.get('/usage', async (req, res) => {
  try {
    const currentMonth = getCurrentMonth();
    
    // Get current month usage
    const currentUsage = await req.db.collection('usage_records').findOne(
      { user_id: req.user.id, month: currentMonth },
      { projection: { _id: 0 } }
    ) || {
      assistant_actions: 0,
      content_generations: 0,
      chatbot_messages: 0,
      insights_refreshes: 0
    };
    
    // Get last 6 months history
    const history = await req.db.collection('usage_records')
      .find({ user_id: req.user.id }, { projection: { _id: 0 } })
      .sort({ month: -1 })
      .limit(6)
      .toArray();
    
    const limits = PLAN_LIMITS[req.user.plan] || PLAN_LIMITS.free;
    
    res.json({
      current_month: currentMonth,
      usage: currentUsage,
      limits,
      history
    });
  } catch (error) {
    res.status(500).json({ detail: 'Failed to get usage data' });
  }
});

// Get activated sites
router.get('/sites', async (req, res) => {
  try {
    const sites = await req.db.collection('site_activations')
      .find({ user_id: req.user.id }, { projection: { _id: 0 } })
      .sort({ activated_at: -1 })
      .toArray();
    
    const limits = PLAN_LIMITS[req.user.plan] || PLAN_LIMITS.free;
    
    res.json({
      sites,
      sites_allowed: limits.sites,
      sites_used: sites.filter(s => s.is_active).length
    });
  } catch (error) {
    res.status(500).json({ detail: 'Failed to get sites' });
  }
});

// Deactivate a site
router.delete('/sites/:site_id', async (req, res) => {
  try {
    const result = await req.db.collection('site_activations').updateOne(
      { user_id: req.user.id, site_id: req.params.site_id },
      { $set: { is_active: false } }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ detail: 'Site not found' });
    }
    
    res.json({ message: 'Site deactivated successfully' });
  } catch (error) {
    res.status(500).json({ detail: 'Failed to deactivate site' });
  }
});

// Update settings
router.put('/settings', async (req, res) => {
  try {
    const { name, company_name } = req.body;
    
    const updates = { updated_at: new Date().toISOString() };
    if (name) updates.name = name;
    if (company_name !== undefined) updates.company_name = company_name;
    
    await req.db.collection('users').updateOne(
      { id: req.user.id },
      { $set: updates }
    );
    
    res.json({ message: 'Settings updated successfully' });
  } catch (error) {
    res.status(500).json({ detail: 'Failed to update settings' });
  }
});

// Change password
router.post('/change-password', async (req, res) => {
  try {
    const { current_password, new_password } = req.body;
    
    // Get user with password
    const user = await req.db.collection('users').findOne({ id: req.user.id });
    
    const validPassword = await bcrypt.compare(current_password, user.password_hash);
    if (!validPassword) {
      return res.status(400).json({ detail: 'Current password is incorrect' });
    }
    
    const password_hash = await bcrypt.hash(new_password, 10);
    
    await req.db.collection('users').updateOne(
      { id: req.user.id },
      { $set: { password_hash, updated_at: new Date().toISOString() } }
    );
    
    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ detail: 'Failed to change password' });
  }
});

// Delete account
router.delete('/account', async (req, res) => {
  try {
    // Delete user data
    await req.db.collection('usage_records').deleteMany({ user_id: req.user.id });
    await req.db.collection('site_activations').deleteMany({ user_id: req.user.id });
    await req.db.collection('plugin_events').deleteMany({ user_id: req.user.id });
    await req.db.collection('users').deleteOne({ id: req.user.id });
    
    res.json({ success: true, message: 'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ detail: 'Failed to delete account' });
  }
});

module.exports = router;
