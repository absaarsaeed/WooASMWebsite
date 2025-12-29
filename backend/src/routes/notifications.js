const express = require('express');

const router = express.Router();

// Seed notifications for social proof
const SEED_NOTIFICATIONS = [
  { user_name: 'Michael', country: 'US', plan: 'professional' },
  { user_name: 'Sarah', country: 'UK', plan: 'starter' },
  { user_name: 'Thomas', country: 'Germany', plan: 'professional' },
  { user_name: 'Emma', country: 'Canada', plan: 'starter' },
  { user_name: 'Lucas', country: 'Australia', plan: 'starter' },
  { user_name: 'Sophie', country: 'France', plan: 'professional' },
  { user_name: 'James', country: 'US', plan: 'starter' },
  { user_name: 'Lisa', country: 'UK', plan: 'starter' },
  { user_name: 'David', country: 'Netherlands', plan: 'professional' },
  { user_name: 'Anna', country: 'Sweden', plan: 'starter' }
];

// Get a single recent notification
router.get('/recent', async (req, res) => {
  try {
    // Get real notifications from database
    const realNotifications = await req.db.collection('purchase_notifications')
      .find({}, { projection: { _id: 0 } })
      .sort({ created_at: -1 })
      .limit(10)
      .toArray();
    
    // If we have real notifications, pick one randomly
    if (realNotifications.length > 0) {
      const notif = realNotifications[Math.floor(Math.random() * realNotifications.length)];
      const displayName = notif.display_name || notif.user_name || 'Customer';
      
      let secondsAgo = 300;
      if (notif.created_at) {
        const createdAt = new Date(notif.created_at);
        secondsAgo = Math.floor((Date.now() - createdAt.getTime()) / 1000);
      }
      
      return res.json({
        notification: {
          display_name: displayName,
          plan: notif.plan || 'starter',
          seconds_ago: Math.min(secondsAgo, 86400)
        }
      });
    }
    
    // Use seed data if no real notifications
    const seed = SEED_NOTIFICATIONS[Math.floor(Math.random() * SEED_NOTIFICATIONS.length)];
    const secondsAgo = Math.floor(Math.random() * 6900) + 300; // 5 mins to 2 hours
    
    res.json({
      notification: {
        display_name: `${seed.user_name} from ${seed.country}`,
        plan: seed.plan,
        seconds_ago: secondsAgo
      }
    });
  } catch (error) {
    console.error('Notification error:', error);
    // Return seed data on error
    const seed = SEED_NOTIFICATIONS[Math.floor(Math.random() * SEED_NOTIFICATIONS.length)];
    res.json({
      notification: {
        display_name: `${seed.user_name} from ${seed.country}`,
        plan: seed.plan,
        seconds_ago: 600
      }
    });
  }
});

// Get recent purchases list
router.get('/recent-purchases', async (req, res) => {
  try {
    const realNotifications = await req.db.collection('purchase_notifications')
      .find({}, { projection: { _id: 0 } })
      .sort({ created_at: -1 })
      .limit(20)
      .toArray();
    
    const notifications = [];
    
    // Add real notifications
    for (const notif of realNotifications) {
      let displayName = notif.display_name || notif.user_name || 'Customer';
      if (notif.country && !notif.display_name) {
        displayName = `${notif.user_name} from ${notif.country}`;
      }
      
      let timeAgo = 'recently';
      if (notif.created_at) {
        const seconds = Math.floor((Date.now() - new Date(notif.created_at).getTime()) / 1000);
        if (seconds < 60) timeAgo = 'just now';
        else if (seconds < 3600) timeAgo = `${Math.floor(seconds / 60)} minutes ago`;
        else if (seconds < 86400) timeAgo = `${Math.floor(seconds / 3600)} hours ago`;
        else timeAgo = `${Math.floor(seconds / 86400)} days ago`;
      }
      
      notifications.push({
        display_name: displayName,
        plan: notif.plan || 'starter',
        time_ago: timeAgo
      });
    }
    
    // Add seed data if needed
    if (notifications.length < 10) {
      const needed = Math.min(10 - notifications.length, SEED_NOTIFICATIONS.length);
      const shuffled = [...SEED_NOTIFICATIONS].sort(() => 0.5 - Math.random());
      
      for (let i = 0; i < needed; i++) {
        const seed = shuffled[i];
        const hoursAgo = Math.floor(Math.random() * 48) + 1;
        
        notifications.push({
          display_name: `${seed.user_name} from ${seed.country}`,
          plan: seed.plan,
          time_ago: hoursAgo < 24 ? `${hoursAgo} hours ago` : `${Math.floor(hoursAgo / 24)} days ago`
        });
      }
    }
    
    // Shuffle to mix real and seed
    notifications.sort(() => 0.5 - Math.random());
    
    res.json({ notifications: notifications.slice(0, 20) });
  } catch (error) {
    console.error('Recent purchases error:', error);
    res.status(500).json({ detail: 'Failed to get notifications' });
  }
});

module.exports = router;
