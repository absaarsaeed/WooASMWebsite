const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { authenticateAdmin, JWT_SECRET } = require('../middleware/auth');
const { getCurrentMonth } = require('../utils/helpers');

const router = express.Router();

// Admin credentials (change in production)
const ADMIN_USERNAME = 'absaar';
const ADMIN_PASSWORD = 'AbsaarAdmin@12345';

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return res.status(401).json({ detail: 'Invalid credentials' });
    }
    
    const admin_token = jwt.sign(
      { username, type: 'admin', role: 'super_admin' },
      JWT_SECRET,
      { expiresIn: '8h' }
    );
    
    res.json({ admin_token, role: 'super_admin' });
  } catch (error) {
    res.status(500).json({ detail: 'Login failed' });
  }
});

// Get admin stats
router.get('/stats', authenticateAdmin, async (req, res) => {
  try {
    const db = req.db;
    const now = new Date();
    const currentMonth = getCurrentMonth();
    
    // User stats
    const totalUsers = await db.collection('users').countDocuments();
    const usersToday = await db.collection('users').countDocuments({
      created_at: { $gte: new Date(now.setHours(0, 0, 0, 0)).toISOString() }
    });
    
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const usersThisWeek = await db.collection('users').countDocuments({
      created_at: { $gte: weekAgo }
    });
    
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    const usersThisMonth = await db.collection('users').countDocuments({
      created_at: { $gte: monthStart }
    });
    
    // Plan distribution
    const freePlan = await db.collection('users').countDocuments({ plan: 'free' });
    const starterPlan = await db.collection('users').countDocuments({ plan: 'starter' });
    const professionalPlan = await db.collection('users').countDocuments({ plan: 'professional' });
    
    // Revenue calculation
    const starterMonthly = await db.collection('users').countDocuments({ plan: 'starter', billing_cycle: 'monthly' });
    const starterYearly = await db.collection('users').countDocuments({ plan: 'starter', billing_cycle: 'yearly' });
    const proMonthly = await db.collection('users').countDocuments({ plan: 'professional', billing_cycle: 'monthly' });
    const proYearly = await db.collection('users').countDocuments({ plan: 'professional', billing_cycle: 'yearly' });
    
    const mrr = (starterMonthly * 29) + (starterYearly * 290 / 12) + (proMonthly * 79) + (proYearly * 790 / 12);
    const arr = mrr * 12;
    
    // Usage stats
    const usageAgg = await db.collection('usage_records').aggregate([
      { $match: { month: currentMonth } },
      { $group: {
        _id: null,
        assistant_actions: { $sum: '$assistant_actions' },
        content_generations: { $sum: '$content_generations' },
        chatbot_messages: { $sum: '$chatbot_messages' },
        insights_refreshes: { $sum: '$insights_refreshes' }
      }}
    ]).toArray();
    
    const usageStats = usageAgg[0] || {
      assistant_actions: 0,
      content_generations: 0,
      chatbot_messages: 0,
      insights_refreshes: 0
    };
    
    // Sites stats
    const totalSites = await db.collection('site_activations').countDocuments();
    const activeSites = await db.collection('site_activations').countDocuments({ is_active: true });
    const sitesActiveThisWeek = await db.collection('site_activations').countDocuments({
      last_seen_at: { $gte: weekAgo }
    });
    
    res.json({
      overview: {
        total_users: totalUsers,
        users_today: usersToday,
        users_this_week: usersThisWeek,
        users_this_month: usersThisMonth
      },
      plans: {
        free: freePlan,
        starter: starterPlan,
        professional: professionalPlan
      },
      revenue: {
        mrr: Math.round(mrr),
        arr: Math.round(arr)
      },
      usage: {
        ...usageStats,
        total_ai_queries_this_month: usageStats.assistant_actions + usageStats.chatbot_messages
      },
      sites: {
        total_activated: totalSites,
        active: activeSites,
        active_last_7_days: sitesActiveThisWeek
      }
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ detail: 'Failed to get stats' });
  }
});

// Get all users
router.get('/users', authenticateAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const plan = req.query.plan;
    const search = req.query.search;
    
    const query = {};
    if (plan) query.plan = plan;
    if (search) {
      query.$or = [
        { email: { $regex: search, $options: 'i' } },
        { name: { $regex: search, $options: 'i' } }
      ];
    }
    
    const total = await req.db.collection('users').countDocuments(query);
    
    const users = await req.db.collection('users')
      .find(query, { projection: { password_hash: 0, _id: 0 } })
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();
    
    // Add sites count for each user
    for (const user of users) {
      user.sites_count = await req.db.collection('site_activations').countDocuments({
        user_id: user.id,
        is_active: true
      });
    }
    
    res.json({
      users,
      total,
      page,
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({ detail: 'Failed to get users' });
  }
});

// Get user by ID
router.get('/users/:user_id', authenticateAdmin, async (req, res) => {
  try {
    const user = await req.db.collection('users').findOne(
      { id: req.params.user_id },
      { projection: { password_hash: 0, _id: 0 } }
    );
    
    if (!user) {
      return res.status(404).json({ detail: 'User not found' });
    }
    
    const sites = await req.db.collection('site_activations')
      .find({ user_id: user.id }, { projection: { _id: 0 } })
      .toArray();
    
    const usage = await req.db.collection('usage_records')
      .find({ user_id: user.id }, { projection: { _id: 0 } })
      .sort({ month: -1 })
      .limit(6)
      .toArray();
    
    res.json({ user, sites, usage_history: usage });
  } catch (error) {
    res.status(500).json({ detail: 'Failed to get user' });
  }
});

// Get subscription analytics
router.get('/subscriptions', authenticateAdmin, async (req, res) => {
  try {
    const db = req.db;
    
    const starterCount = await db.collection('users').countDocuments({ plan: 'starter' });
    const proCount = await db.collection('users').countDocuments({ plan: 'professional' });
    const cancelledCount = await db.collection('users').countDocuments({ subscription_status: 'cancelled' });
    const pastDueCount = await db.collection('users').countDocuments({ subscription_status: 'past_due' });
    
    const starterMonthly = await db.collection('users').countDocuments({ plan: 'starter', billing_cycle: 'monthly' });
    const starterYearly = await db.collection('users').countDocuments({ plan: 'starter', billing_cycle: 'yearly' });
    const proMonthly = await db.collection('users').countDocuments({ plan: 'professional', billing_cycle: 'monthly' });
    const proYearly = await db.collection('users').countDocuments({ plan: 'professional', billing_cycle: 'yearly' });
    
    const mrr = (starterMonthly * 29) + (starterYearly * 290 / 12) + (proMonthly * 79) + (proYearly * 790 / 12);
    
    res.json({
      active: {
        total: starterCount + proCount,
        starter: starterCount,
        professional: proCount
      },
      cancelled: cancelledCount,
      past_due: pastDueCount,
      revenue: {
        mrr: Math.round(mrr),
        arr: Math.round(mrr * 12)
      }
    });
  } catch (error) {
    res.status(500).json({ detail: 'Failed to get subscriptions' });
  }
});

// Get all sites
router.get('/sites', authenticateAdmin, async (req, res) => {
  try {
    const sites = await req.db.collection('site_activations')
      .find({}, { projection: { _id: 0 } })
      .sort({ activated_at: -1 })
      .limit(100)
      .toArray();
    
    // Group by plugin version
    const byPluginVersion = {};
    const byWordPressVersion = {};
    
    for (const site of sites) {
      const pv = site.plugin_version || 'unknown';
      const wv = site.wordpress_version || 'unknown';
      
      byPluginVersion[pv] = (byPluginVersion[pv] || 0) + 1;
      byWordPressVersion[wv] = (byWordPressVersion[wv] || 0) + 1;
    }
    
    res.json({
      sites,
      by_plugin_version: byPluginVersion,
      by_wordpress_version: byWordPressVersion
    });
  } catch (error) {
    res.status(500).json({ detail: 'Failed to get sites' });
  }
});

module.exports = router;
