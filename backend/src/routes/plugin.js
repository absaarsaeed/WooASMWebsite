const express = require('express');
const { PLAN_LIMITS, getCurrentMonth, generateId } = require('../utils/helpers');

const router = express.Router();

// Helper to get license info from headers
const getLicenseInfo = (req) => {
  return {
    license_key: req.headers['x-license-key'],
    site_id: req.headers['x-site-id']
  };
};

// Validate license key
router.post('/validate-license', async (req, res) => {
  try {
    const { license_key, site_url, site_id, plugin_version, wordpress_version, woocommerce_version } = req.body;
    
    if (!license_key) {
      return res.status(400).json({ valid: false, error: 'missing_license', message: 'License key is required' });
    }
    
    // Find user by license key
    const user = await req.db.collection('users').findOne(
      { license_key },
      { projection: { password_hash: 0, _id: 0 } }
    );
    
    if (!user) {
      return res.json({ valid: false, error: 'invalid_license', message: 'Invalid license key' });
    }
    
    // Check subscription status
    if (user.subscription_status === 'expired') {
      return res.json({ valid: false, error: 'expired', message: 'Subscription has expired' });
    }
    
    if (user.subscription_status === 'cancelled') {
      return res.json({ valid: false, error: 'cancelled', message: 'Subscription has been cancelled' });
    }
    
    const limits = PLAN_LIMITS[user.plan] || PLAN_LIMITS.free;
    
    // Check site limit
    if (site_id) {
      const existingSite = await req.db.collection('site_activations').findOne({ site_id });
      
      if (!existingSite) {
        // Check if user can activate more sites
        const sitesCount = await req.db.collection('site_activations').countDocuments({
          user_id: user.id,
          is_active: true
        });
        
        if (sitesCount >= limits.sites) {
          return res.json({
            valid: false,
            error: 'site_limit_reached',
            message: `You can only activate ${limits.sites} site(s) on your ${user.plan} plan`,
            upgrade_url: `${process.env.APP_URL || 'http://localhost:3000'}/pricing`
          });
        }
        
        // Activate new site
        await req.db.collection('site_activations').insertOne({
          id: generateId(),
          user_id: user.id,
          license_key,
          site_url,
          site_id,
          plugin_version,
          wordpress_version,
          woocommerce_version,
          is_active: true,
          activated_at: new Date().toISOString(),
          last_seen_at: new Date().toISOString()
        });
      } else {
        // Update existing site
        await req.db.collection('site_activations').updateOne(
          { site_id },
          {
            $set: {
              last_seen_at: new Date().toISOString(),
              plugin_version,
              wordpress_version,
              woocommerce_version
            }
          }
        );
      }
    }
    
    // Get current usage
    const currentMonth = getCurrentMonth();
    const usage = await req.db.collection('usage_records').findOne(
      { user_id: user.id, month: currentMonth },
      { projection: { _id: 0 } }
    ) || {
      assistant_actions: 0,
      content_generations: 0,
      chatbot_messages: 0,
      insights_refreshes: 0
    };
    
    res.json({
      valid: true,
      plan: user.plan,
      features: limits.features,
      limits: {
        assistant_actions: limits.assistant_actions,
        content_generations: limits.content_generations,
        chatbot_messages: limits.chatbot_messages,
        insights_refreshes: limits.insights_refreshes
      },
      usage: {
        assistant_actions: usage.assistant_actions || 0,
        content_generations: usage.content_generations || 0,
        chatbot_messages: usage.chatbot_messages || 0,
        insights_refreshes: usage.insights_refreshes || 0
      },
      user_name: user.name,
      subscription_ends_at: user.subscription_ends_at
    });
  } catch (error) {
    console.error('License validation error:', error);
    res.status(500).json({ valid: false, error: 'server_error', message: 'Validation failed' });
  }
});

// Track usage
router.post('/track-usage', async (req, res) => {
  try {
    const { license_key, site_id } = getLicenseInfo(req);
    const { action_type, count = 1 } = req.body;
    
    if (!license_key) {
      return res.status(400).json({ success: false, error: 'missing_license' });
    }
    
    const validActions = ['assistant_action', 'content_generation', 'chatbot_message', 'insights_refresh'];
    if (!validActions.includes(action_type)) {
      return res.status(400).json({ success: false, error: 'invalid_action_type' });
    }
    
    // Find user
    const user = await req.db.collection('users').findOne({ license_key });
    if (!user) {
      return res.status(400).json({ success: false, error: 'invalid_license' });
    }
    
    const limits = PLAN_LIMITS[user.plan] || PLAN_LIMITS.free;
    const currentMonth = getCurrentMonth();
    
    // Get or create usage record
    let usageRecord = await req.db.collection('usage_records').findOne({
      user_id: user.id,
      month: currentMonth
    });
    
    if (!usageRecord) {
      usageRecord = {
        id: generateId(),
        user_id: user.id,
        site_id,
        month: currentMonth,
        assistant_actions: 0,
        content_generations: 0,
        chatbot_messages: 0,
        insights_refreshes: 0,
        created_at: new Date().toISOString()
      };
      await req.db.collection('usage_records').insertOne(usageRecord);
    }
    
    // Map action type to field
    const fieldMap = {
      assistant_action: 'assistant_actions',
      content_generation: 'content_generations',
      chatbot_message: 'chatbot_messages',
      insights_refresh: 'insights_refreshes'
    };
    
    const field = fieldMap[action_type];
    const currentUsage = usageRecord[field] || 0;
    const limit = limits[field];
    
    // Check limit (-1 means unlimited)
    if (limit !== -1 && currentUsage + count > limit) {
      return res.json({
        success: false,
        error: 'limit_exceeded',
        message: `${action_type} limit exceeded`,
        current: currentUsage,
        limit,
        upgrade_url: `${process.env.APP_URL || 'http://localhost:3000'}/pricing`
      });
    }
    
    // Update usage
    await req.db.collection('usage_records').updateOne(
      { user_id: user.id, month: currentMonth },
      {
        $inc: { [field]: count },
        $set: { updated_at: new Date().toISOString() }
      }
    );
    
    res.json({
      success: true,
      usage: currentUsage + count,
      limit,
      remaining: limit === -1 ? -1 : limit - (currentUsage + count)
    });
  } catch (error) {
    console.error('Track usage error:', error);
    res.status(500).json({ success: false, error: 'server_error' });
  }
});

// Track event
router.post('/track-event', async (req, res) => {
  try {
    const { license_key, site_id } = getLicenseInfo(req);
    const { event_type, event_name, event_data } = req.body;
    
    if (!license_key) {
      return res.status(400).json({ success: false, error: 'missing_license' });
    }
    
    const user = await req.db.collection('users').findOne({ license_key });
    if (!user) {
      return res.status(400).json({ success: false, error: 'invalid_license' });
    }
    
    await req.db.collection('plugin_events').insertOne({
      id: generateId(),
      user_id: user.id,
      site_id,
      event_type,
      event_name,
      event_data,
      created_at: new Date().toISOString()
    });
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: 'server_error' });
  }
});

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

module.exports = router;
